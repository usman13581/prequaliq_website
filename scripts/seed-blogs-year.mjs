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

const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey(),
});

const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImageId: uuid("cover_image_id"),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  authorId: uuid("author_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

const blogImages = pgTable("blog_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id"),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  data: text("data").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function wordCount(html) {
  return stripHtml(html).split(" ").filter(Boolean).length;
}

async function downloadImage(url, dest, tag) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`[${tag}] downloaded ${path.relative(projectRoot, dest)}`);
}

async function resolveImage(post, tag, force = false) {
  const imageFile = coverImageFileName(post.slug);
  const imagePath = path.join(coversDir, imageFile);
  const imageUrl = coverImageUrlForSlug(post.slug);

  if (force && fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  if (fs.existsSync(imagePath)) {
    console.log(`[${tag}] use cached: ${imageFile}`);
    return { imagePath, imageFile };
  }

  await downloadImage(imageUrl, imagePath, tag);
  return { imagePath, imageFile };
}

async function main() {
  const year = process.argv[2] ?? process.env.BLOG_SEED_YEAR;
  if (!year || !/^\d{4}$/.test(String(year))) {
    console.error("[seed-blogs] Usage: node scripts/seed-blogs-year.mjs <year>");
    process.exit(1);
  }

  const tag = `seed-blogs-${year}`;
  const module = await import(`./blog-posts-${year}.mjs`);
  const posts = module.blogPosts;
  if (!posts?.length) {
    console.error(`[${tag}] No posts found in blog-posts-${year}.mjs`);
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(`[${tag}] DATABASE_URL is not set`);
    process.exit(1);
  }

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  const admins = await db.select({ id: adminUsers.id }).from(adminUsers).limit(1);
  const authorId = admins[0]?.id ?? null;

  let created = 0;
  let updated = 0;

  for (const post of posts) {
    const existing = await db
      .select({ id: blogPosts.id, content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, post.slug))
      .limit(1);

    if (existing.length > 0) {
      const content = existing[0].content.replace(/^\s*<figure>[\s\S]*?<\/figure>\s*/i, "").trim();
      await db
        .update(blogPosts)
        .set({ title: post.title, excerpt: post.excerpt, content, updatedAt: new Date() })
        .where(eq(blogPosts.slug, post.slug));
      console.log(`[${tag}] updated: ${post.slug}`);
      updated++;
      continue;
    }

    const words = wordCount(post.content);
    if (words > 500) {
      console.warn(`[${tag}] warning: ${post.slug} is ${words} words (>500)`);
    }

    const { imagePath, imageFile } = await resolveImage(post, tag);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64 = imageBuffer.toString("base64");

    const [imageRow] = await db
      .insert(blogImages)
      .values({
        fileName: imageFile,
        mimeType: "image/jpeg",
        data: base64,
        sortOrder: 0,
      })
      .returning({ id: blogImages.id });

    const publishedAt = new Date(post.publishedAt);

    const [row] = await db
      .insert(blogPosts)
      .values({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content.trim(),
        coverImageId: imageRow.id,
        status: "published",
        publishedAt,
        authorId,
        updatedAt: publishedAt,
        createdAt: publishedAt,
      })
      .returning({ id: blogPosts.id, slug: blogPosts.slug });

    await db.update(blogImages).set({ postId: row.id }).where(eq(blogImages.id, imageRow.id));

    console.log(`[${tag}] created ${row.slug} · ${words} words · ${post.publishedAt}`);
    created++;
  }

  try {
    execSync("node scripts/sync-static-resources.mjs", { cwd: projectRoot, stdio: "inherit" });
  } catch {
    console.warn(`[${tag}] static sync skipped`);
  }

  console.log(`[${tag}] done — ${created} created, ${updated} updated`);
  await sql.end();
}

main().catch((error) => {
  console.error("[seed-blogs] failed:", error);
  process.exit(1);
});
