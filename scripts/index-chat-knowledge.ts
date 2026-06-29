import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { and, eq } from "drizzle-orm";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { getDb } from "../src/db/index";
import { blogPosts, chatIndexRuns } from "../src/db/schema";
import {
  collectSiteDocuments,
  contentHashForBody,
  blogDocumentFromRow,
  type ChatContentDocument,
} from "../src/lib/chat-content";
import { chunkDocumentText } from "../src/lib/chat-chunking";
import { CHAT_CONFIG } from "../src/lib/chat-config";
import { embedTexts } from "../src/lib/chat-openai";
import type { Locale } from "../src/i18n/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

function loadEnvFile(filePath: string) {
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

async function loadAllDocuments(): Promise<ChatContentDocument[]> {
  const locales: Locale[] = ["en", "sv"];
  const docs: ChatContentDocument[] = [];

  for (const locale of locales) {
    docs.push(...collectSiteDocuments(locale));
  }

  const db = getDb();
  const posts = await db
    .select({
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      content: blogPosts.content,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  for (const post of posts) {
    docs.push(blogDocumentFromRow(post));
  }

  return docs;
}

async function upsertDocument(
  doc: ChatContentDocument,
  sql: ReturnType<typeof postgres>,
): Promise<{ skipped: boolean; chunksCreated: number }> {
  const hash = contentHashForBody(doc.body);
  const chunks = chunkDocumentText(doc.body, {
    sourceType: doc.sourceType,
    sourceKey: doc.sourceKey,
    title: doc.title,
  });

  const [found] = await sql<{ id: string; content_hash: string }[]>`
    SELECT id, content_hash FROM chat_documents
    WHERE source_type = ${doc.sourceType}
      AND source_key = ${doc.sourceKey}
      AND locale = ${doc.locale}
    LIMIT 1
  `;

  if (found && found.content_hash === hash) {
    return { skipped: true, chunksCreated: 0 };
  }

  let documentId: string;
  const metadataJson = JSON.stringify(doc.metadata);

  if (found) {
    documentId = found.id;
    await sql`DELETE FROM chat_chunks WHERE document_id = ${documentId}`;
    await sql`
      UPDATE chat_documents SET
        title = ${doc.title},
        url_path = ${doc.urlPath},
        content_hash = ${hash},
        metadata = ${metadataJson}::jsonb,
        indexed_at = NOW(),
        updated_at = NOW(),
        is_active = true
      WHERE id = ${documentId}
    `;
  } else {
    const [inserted] = await sql<{ id: string }[]>`
      INSERT INTO chat_documents (source_type, source_key, locale, title, url_path, content_hash, metadata, indexed_at)
      VALUES (
        ${doc.sourceType},
        ${doc.sourceKey},
        ${doc.locale},
        ${doc.title},
        ${doc.urlPath},
        ${hash},
        ${metadataJson}::jsonb,
        NOW()
      )
      RETURNING id
    `;
    documentId = inserted.id;
  }

  if (chunks.length === 0) return { skipped: false, chunksCreated: 0 };

  let created = 0;
  for (let i = 0; i < chunks.length; i += CHAT_CONFIG.embedBatchSize) {
    const batch = chunks.slice(i, i + CHAT_CONFIG.embedBatchSize);
    const vectors = await embedTexts(batch.map((c) => c.content));

    for (let j = 0; j < batch.length; j++) {
      const chunk = batch[j];
      const vector = vectors[j];
      const chunkMeta = JSON.stringify(chunk.metadata);
      const embeddingJson = JSON.stringify(vector);
      await sql`
        INSERT INTO chat_chunks (document_id, chunk_index, content, embedding, metadata, token_count)
        VALUES (
          ${documentId},
          ${Number(chunk.metadata.chunkIndex ?? j)},
          ${chunk.content},
          ${embeddingJson}::jsonb,
          ${chunkMeta}::jsonb,
          ${chunk.tokenCount}
        )
      `;
      created++;
    }
  }

  return { skipped: false, chunksCreated: created };
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("[chat:index] DATABASE_URL is not set");
    process.exit(1);
  }
  if (!process.env.OPENAI_API_KEY) {
    console.error("[chat:index] OPENAI_API_KEY is not set");
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);
  const docs = await loadAllDocuments();

  const [run] = await db
    .insert(chatIndexRuns)
    .values({ status: "running" })
    .returning({ id: chatIndexRuns.id });

  let chunksCreated = 0;
  let chunksSkipped = 0;
  let documentsProcessed = 0;

  try {
    console.log(`[chat:index] Processing ${docs.length} documents…`);

    for (const doc of docs) {
      const result = await upsertDocument(doc, sql);
      documentsProcessed++;
      if (result.skipped) {
        chunksSkipped++;
        console.log(`[chat:index] skip ${doc.locale}/${doc.sourceType}/${doc.sourceKey}`);
      } else {
        chunksCreated += result.chunksCreated;
        console.log(
          `[chat:index] indexed ${doc.locale}/${doc.sourceType}/${doc.sourceKey} → ${result.chunksCreated} chunks`,
        );
      }
    }

    await db
      .update(chatIndexRuns)
      .set({
        status: "success",
        finishedAt: new Date(),
        chunksCreated,
        chunksSkipped,
        documentsProcessed,
      })
      .where(eq(chatIndexRuns.id, run.id));

    console.log(
      `[chat:index] done — ${documentsProcessed} docs, ${chunksCreated} chunks created, ${chunksSkipped} unchanged`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await db
      .update(chatIndexRuns)
      .set({ status: "failed", finishedAt: new Date(), error: message })
      .where(eq(chatIndexRuns.id, run.id));
    console.error("[chat:index] failed:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
