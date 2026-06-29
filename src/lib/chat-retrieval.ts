import postgres from "postgres";
import type { Locale } from "@/i18n/config";
import { CHAT_CONFIG } from "@/lib/chat-config";
import { embedQuery } from "@/lib/chat-openai";
import { cosineSimilarity } from "@/lib/chat-similarity";

export type RetrievedChunk = {
  chunkId: string;
  content: string;
  score: number;
  title: string;
  urlPath: string;
  sourceType: string;
  sourceKey: string;
  metadata: Record<string, unknown>;
};

function getSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  return postgres(connectionString, { max: 1 });
}

export async function countIndexedChunks(): Promise<number> {
  const sql = getSql();
  try {
    const [row] = await sql<{ count: string }[]>`
      SELECT COUNT(*)::text AS count FROM chat_chunks WHERE embedding IS NOT NULL
    `;
    return Number(row?.count ?? 0);
  } finally {
    await sql.end();
  }
}

export async function retrieveChunks(
  query: string,
  locale: Locale,
  limit: number = CHAT_CONFIG.topK,
): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embedQuery(query);
  const sql = getSql();

  try {
    const rows = await sql<
      {
        chunk_id: string;
        content: string;
        embedding: number[];
        title: string;
        url_path: string;
        source_type: string;
        source_key: string;
        metadata: Record<string, unknown>;
      }[]
    >`
      SELECT
        c.id AS chunk_id,
        c.content,
        c.embedding,
        d.title,
        d.url_path,
        d.source_type,
        d.source_key,
        c.metadata
      FROM chat_chunks c
      INNER JOIN chat_documents d ON d.id = c.document_id
      WHERE d.is_active = true
        AND c.embedding IS NOT NULL
        AND (
          d.locale = ${locale}
          OR (d.source_type = 'blog' AND d.locale = 'en')
        )
    `;

    const scored = rows
      .map((row) => {
        const embedding = Array.isArray(row.embedding) ? row.embedding : [];
        return {
          chunkId: row.chunk_id,
          content: row.content,
          score: cosineSimilarity(queryEmbedding, embedding),
          title: row.title,
          urlPath: row.url_path,
          sourceType: row.source_type,
          sourceKey: row.source_key,
          metadata: row.metadata ?? {},
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scored;
  } finally {
    await sql.end();
  }
}

export function filterChunksByThreshold(chunks: RetrievedChunk[]): RetrievedChunk[] {
  return chunks.filter((c) => c.score >= CHAT_CONFIG.similarityThreshold);
}

export function dedupeSources(chunks: RetrievedChunk[]): RetrievedChunk[] {
  const seen = new Set<string>();
  const result: RetrievedChunk[] = [];
  for (const chunk of chunks) {
    const key = `${chunk.sourceType}:${chunk.sourceKey}:${chunk.urlPath}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(chunk);
  }
  return result;
}
