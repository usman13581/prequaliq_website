import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { pgTable, uuid, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";
import { coverImageFileName, coverImageUrlForSlug } from "./blog-cover-images.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const coversDir = path.join(projectRoot, "static_resources", "images", "blog", "covers");

const YEARS = ["2022", "2023", "2024", "2025"];

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(projectRoot, ".env"));
loadEnvFile(path.join(projectRoot, ".env.local"));

const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull(),
  coverImageId: uuid("cover_image_id"),
});

const blogImages = pgTable("blog_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id"),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  data: text("data").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

async function downloadImage(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(dest, buffer);
}

async function resolveCoverFile(slug, imageUrl, force) {
  const imageFile = coverImageFileName(slug);
  const imagePath = path.join(coversDir, imageFile);

  if (force && fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  if (!fs.existsSync(imagePath)) {
    await downloadImage(imageUrl, imagePath);
    console.log(`[refresh-covers] downloaded ${imageFile}`);
  } else {
    console.log(`[refresh-covers] cached ${imageFile}`);
  }

  return { imagePath, imageFile, buffer: fs.readFileSync(imagePath) };
}

async function loadAllPosts() {
  const posts = [];
  for (const year of YEARS) {
    const mod = await import(`./blog-posts-${year}.mjs`);
    for (const post of mod.blogPosts ?? mod.blogPosts2022 ?? []) {
      posts.push({
        slug: post.slug,
        imageUrl: coverImageUrlForSlug(post.slug),
      });
    }
  }
  return posts;
}

async function main() {
  const force = process.argv.includes("--force");
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("[refresh-covers] DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);
  const definitions = await loadAllPosts();

  let updated = 0;
  let skipped = 0;

  for (const def of definitions) {
    const [row] = await db
      .select({ id: blogPosts.id, coverImageId: blogPosts.coverImageId })
      .from(blogPosts)
      .where(eq(blogPosts.slug, def.slug))
      .limit(1);

    if (!row) {
      console.log(`[refresh-covers] skip (not in DB): ${def.slug}`);
      skipped++;
      continue;
    }

    const { imageFile, buffer } = await resolveCoverFile(def.slug, def.imageUrl, force);
    const base64 = buffer.toString("base64");

    if (row.coverImageId) {
      await db
        .update(blogImages)
        .set({ data: base64, fileName: imageFile, mimeType: "image/jpeg" })
        .where(eq(blogImages.id, row.coverImageId));
    } else {
      const [imageRow] = await db
        .insert(blogImages)
        .values({
          postId: row.id,
          fileName: imageFile,
          mimeType: "image/jpeg",
          data: base64,
          sortOrder: 0,
        })
        .returning({ id: blogImages.id });

      await db.update(blogPosts).set({ coverImageId: imageRow.id }).where(eq(blogPosts.id, row.id));
    }

    console.log(`[refresh-covers] updated cover: ${def.slug}`);
    updated++;
  }

  try {
    execSync("node scripts/sync-static-resources.mjs", { cwd: projectRoot, stdio: "inherit" });
  } catch {
    console.warn("[refresh-covers] static sync skipped");
  }

  console.log(`[refresh-covers] done — ${updated} updated, ${skipped} skipped`);
  await sql.end();
}

main().catch((error) => {
  console.error("[refresh-covers] failed:", error);
  process.exit(1);
});
