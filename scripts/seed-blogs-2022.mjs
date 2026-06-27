import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { pgTable, uuid, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";
import { blogPosts2022 } from "./blog-posts-2022.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const blogImageDir = path.join(projectRoot, "static_resources", "images", "blog", "2022");

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

async function downloadImage(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`[seed-blogs-2022] downloaded ${path.relative(projectRoot, dest)}`);
}

async function resolveImage(post) {
  const imageFile = `${post.serviceSlug}.jpg`;
  const imagePath = path.join(blogImageDir, imageFile);
  const localServiceImage = path.join(
    projectRoot,
    "static_resources",
    "images",
    "services",
    `${post.serviceSlug}.jpg`,
  );

  if (fs.existsSync(imagePath)) {
    console.log(`[seed-blogs-2022] use cached: ${imageFile}`);
    return { imagePath, imageFile };
  }

  if (fs.existsSync(localServiceImage)) {
    fs.mkdirSync(path.dirname(imagePath), { recursive: true });
    fs.copyFileSync(localServiceImage, imagePath);
    console.log(`[seed-blogs-2022] copied from services: ${imageFile}`);
    return { imagePath, imageFile };
  }

  await downloadImage(post.imageUrl, imagePath);
  return { imagePath, imageFile };
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("[seed-blogs-2022] DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  const admins = await db.select({ id: adminUsers.id }).from(adminUsers).limit(1);
  const authorId = admins[0]?.id ?? null;

  let created = 0;
  let skipped = 0;
  let updated = 0;

  for (const post of blogPosts2022) {
    const existing = await db
      .select({ id: blogPosts.id, content: blogPosts.content })
      .from(blogPosts)
      .where(eq(blogPosts.slug, post.slug))
      .limit(1);

    if (existing.length > 0) {
      const content = existing[0].content.replace(/^\s*<figure>[\s\S]*?<\/figure>\s*/i, "").trim();

      await db
        .update(blogPosts)
        .set({ title: post.title, content, updatedAt: new Date() })
        .where(eq(blogPosts.slug, post.slug));

      console.log(`[seed-blogs-2022] updated: ${post.slug}`);
      updated++;
      continue;
    }

    const words = wordCount(post.content);
    if (words > 500) {
      console.warn(`[seed-blogs-2022] warning: ${post.slug} is ${words} words (>500)`);
    }

    const { imagePath, imageFile } = await resolveImage(post);

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

    const contentWithHero = post.content.trim();

    const publishedAt = new Date(post.publishedAt);

    const [row] = await db
      .insert(blogPosts)
      .values({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: contentWithHero,
        coverImageId: imageRow.id,
        status: "published",
        publishedAt,
        authorId,
        updatedAt: publishedAt,
        createdAt: publishedAt,
      })
      .returning({ id: blogPosts.id, slug: blogPosts.slug });

    await db.update(blogImages).set({ postId: row.id }).where(eq(blogImages.id, imageRow.id));

    console.log(
      `[seed-blogs-2022] created ${row.slug} · ${words} words · ${post.publishedAt}`,
    );
    created++;
  }

  try {
    execSync("node scripts/sync-static-resources.mjs", { cwd: projectRoot, stdio: "inherit" });
  } catch {
    console.warn("[seed-blogs-2022] static sync skipped");
  }

  console.log(`[seed-blogs-2022] done — ${created} created, ${updated} updated, ${skipped} skipped`);
  await sql.end();
}

main().catch((error) => {
  console.error("[seed-blogs-2022] failed:", error);
  process.exit(1);
});
