/**
 * Clears existing blog posts and seeds one public-procurement insight per month
 * from Feb 2022 through Oct 2026.
 *
 * Usage: node scripts/seed-procurement-blogs.mjs
 *
 * Intended for Railway start: migrate → seed-admin → seed-procurement-blogs → next start
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";
import { procurementBlogPosts } from "./data/procurement-blog-posts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

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
    console.log(`[${tag}] clearing + seeding ${procurementBlogPosts.length} posts…`);

    await sql.begin(async (tx) => {
      await tx`DELETE FROM blog_posts`;

      const admins = await tx`SELECT id FROM admin_users LIMIT 1`;
      const authorId = admins[0]?.id ?? null;

      for (const post of procurementBlogPosts) {
        const publishedAt = new Date(post.publishedAt);
        await tx`
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
            ${null},
            ${"published"},
            ${publishedAt},
            ${authorId},
            ${publishedAt},
            ${publishedAt}
          )
        `;
      }
    });

    const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM blog_posts`;
    console.log(`[${tag}] done — ${count} published posts in database`);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error("[seed-procurement-blogs] failed:", error);
  process.exit(1);
});
