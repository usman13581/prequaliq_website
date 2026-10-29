/**
 * Clears existing blog posts and seeds one public-procurement insight per month
 * from Feb 2022 through Oct 2026 (contemporary voice + Unsplash covers).
 *
 * Usage: node scripts/seed-procurement-blogs.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import postgres from "postgres";
import { procurementBlogPosts } from "./data/procurement-blog-posts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const coversDir = path.join(projectRoot, "static_resources", "images", "blog", "covers");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(projectRoot, ".env"));
loadEnvFile(path.join(projectRoot, ".env.local"));

async function downloadCover(post, tag) {
  const imageFile = `${post.slug}.jpg`;
  const imagePath = path.join(coversDir, imageFile);
  fs.mkdirSync(coversDir, { recursive: true });

  const fallback =
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&h=788&q=85";

  if (!fs.existsSync(imagePath)) {
    const urls = [post.imageUrl, fallback].filter(Boolean);
    let saved = false;
    for (const url of urls) {
      try {
        const response = await fetch(url, { redirect: "follow" });
        if (!response.ok) continue;
        fs.writeFileSync(imagePath, Buffer.from(await response.arrayBuffer()));
        console.log(`[${tag}] cover downloaded: ${imageFile}`);
        saved = true;
        break;
      } catch {
        // try next URL
      }
    }
    if (!saved) {
      throw new Error(`Failed to download cover for ${post.slug}`);
    }
  } else {
    console.log(`[${tag}] cover cached: ${imageFile}`);
  }

  return {
    imageFile,
    base64: fs.readFileSync(imagePath).toString("base64"),
  };
}

async function main() {
  const tag = "seed-procurement-blogs";
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn(`[${tag}] DATABASE_URL is not set — skipping seed.`);
    return;
  }

  if (!procurementBlogPosts?.length) {
    console.error(`[${tag}] No posts found`);
    process.exit(1);
  }

  const sql = postgres(connectionString, { max: 1, connect_timeout: 30 });

  try {
    console.log(`[${tag}] clearing + seeding ${procurementBlogPosts.length} posts with covers…`);

    // Download covers outside the DB transaction (network I/O).
    const prepared = [];
    for (const post of procurementBlogPosts) {
      const cover = await downloadCover(post, tag);
      prepared.push({ post, cover });
    }

    await sql.begin(async (tx) => {
      await tx`DELETE FROM blog_images`;
      await tx`DELETE FROM blog_posts`;

      const admins = await tx`SELECT id FROM admin_users LIMIT 1`;
      const authorId = admins[0]?.id ?? null;

      for (const { post, cover } of prepared) {
        const publishedAt = new Date(post.publishedAt);

        const [imageRow] = await tx`
          INSERT INTO blog_images (file_name, mime_type, data, sort_order)
          VALUES (${cover.imageFile}, ${"image/jpeg"}, ${cover.base64}, ${0})
          RETURNING id
        `;

        const [postRow] = await tx`
          INSERT INTO blog_posts (
            slug, title, excerpt, content,
            title_sv, excerpt_sv, content_sv,
            cover_image_id, status, published_at, author_id, created_at, updated_at
          ) VALUES (
            ${post.slug},
            ${post.title},
            ${post.excerpt},
            ${post.content.trim()},
            ${post.titleSv ?? null},
            ${post.excerptSv ?? null},
            ${post.contentSv ? post.contentSv.trim() : null},
            ${imageRow.id},
            ${"published"},
            ${publishedAt},
            ${authorId},
            ${publishedAt},
            ${publishedAt}
          )
          RETURNING id
        `;

        await tx`UPDATE blog_images SET post_id = ${postRow.id} WHERE id = ${imageRow.id}`;
      }
    });

    const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM blog_posts`;
    const [{ covers }] = await sql`
      SELECT COUNT(*)::int AS covers FROM blog_posts WHERE cover_image_id IS NOT NULL
    `;
    console.log(`[${tag}] done — ${count} posts, ${covers} with covers`);

    try {
      execSync("node scripts/sync-static-resources.mjs", { cwd: projectRoot, stdio: "inherit" });
    } catch {
      console.warn(`[${tag}] static sync skipped`);
    }
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error("[seed-procurement-blogs] failed:", error);
  process.exit(1);
});
