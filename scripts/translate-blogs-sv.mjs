#!/usr/bin/env node
/**
 * Fill missing Swedish blog fields (title_sv, excerpt_sv, content_sv) via OpenAI.
 * Safe to run on every deploy — skips posts that already have content_sv.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, isNull, or } from "drizzle-orm";
import postgres from "postgres";
import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

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
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  titleSv: varchar("title_sv", { length: 500 }),
  excerptSv: text("excerpt_sv"),
  contentSv: text("content_sv"),
  status: varchar("status", { length: 20 }).notNull(),
});

function extractJsonObject(text) {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("Model did not return JSON");
  }
}

async function translatePost(client, model, post) {
  const system = `You are a professional Swedish translator for an enterprise IT company website (PrequaliQ, Stockholm).
Translate the blog post into natural, formal Swedish (sv-SE).
Keep HTML tags and structure exactly (<p>, <h2>, <strong>, <em>, lists, etc.).
Keep product names, brand names, and technical terms where Swedish readers expect English (e.g. Next.js, .NET, ERP, RAG, EU AI Act) but translate surrounding prose.
Do not add or remove sections. Return ONLY valid JSON with keys: title, excerpt, content.`;

  const user = JSON.stringify({
    title: post.title,
    excerpt: post.excerpt ?? "",
    content: post.content,
  });

  const response = await client.chat.completions.create({
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  const raw = response.choices[0]?.message?.content ?? "";
  const parsed = extractJsonObject(raw);
  const title = typeof parsed.title === "string" ? parsed.title.trim() : "";
  const excerpt = typeof parsed.excerpt === "string" ? parsed.excerpt.trim() : "";
  const content = typeof parsed.content === "string" ? parsed.content.trim() : "";
  if (!title || !content) {
    throw new Error("Translation missing title or content");
  }
  return { title, excerpt: excerpt || null, content };
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.CHAT_MODEL ?? "gpt-4o-mini";

  if (!connectionString) {
    console.log("[translate-blogs-sv] DATABASE_URL not set — skip");
    return;
  }
  if (!apiKey) {
    console.log("[translate-blogs-sv] OPENAI_API_KEY not set — skip");
    return;
  }

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey });

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  const pending = await db
    .select()
    .from(blogPosts)
    .where(or(isNull(blogPosts.contentSv), eq(blogPosts.contentSv, "")));

  const toTranslate = pending.filter((p) => p.status === "published" || p.status === "draft");
  console.log(`[translate-blogs-sv] ${toTranslate.length} post(s) need Swedish translation`);

  let ok = 0;
  let failed = 0;

  for (const post of toTranslate) {
    try {
      console.log(`[translate-blogs-sv] translating ${post.slug}…`);
      const sv = await translatePost(client, model, post);
      await db
        .update(blogPosts)
        .set({
          titleSv: sv.title,
          excerptSv: sv.excerpt,
          contentSv: sv.content,
        })
        .where(eq(blogPosts.id, post.id));
      ok++;
      console.log(`[translate-blogs-sv] saved ${post.slug}`);
    } catch (error) {
      failed++;
      console.error(`[translate-blogs-sv] failed ${post.slug}:`, error?.message ?? error);
    }
  }

  console.log(`[translate-blogs-sv] done — ${ok} translated, ${failed} failed`);
  await sql.end();
  if (failed > 0 && ok === 0 && toTranslate.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("[translate-blogs-sv] Failed:", error);
  process.exit(1);
});
