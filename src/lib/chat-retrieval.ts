import postgres from "postgres";
import type { Locale } from "@/i18n/config";
import { CHAT_CONFIG } from "@/lib/chat-config";
import { embedQuery } from "@/lib/chat-openai";
import { buildRetrievalQueries } from "@/lib/chat-query";
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

export function filterChunksByThreshold(
  chunks: RetrievedChunk[],
  threshold = CHAT_CONFIG.similarityThreshold,
): RetrievedChunk[] {
  return chunks.filter((c) => c.score >= threshold);
}

/** Multi-query retrieval with typo/short-query expansion and score merge. */
export async function retrieveForUserMessage(
  message: string,
  locale: Locale,
  extraQueries: string[] = [],
): Promise<RetrievedChunk[]> {
  const queries = [...new Set([...buildRetrievalQueries(message, locale), ...extraQueries])];
  const merged = new Map<string, RetrievedChunk>();

  for (const query of queries) {
    const chunks = await retrieveChunks(query, locale, CHAT_CONFIG.topK);
    for (const chunk of chunks) {
      const existing = merged.get(chunk.chunkId);
      if (!existing || chunk.score > existing.score) {
        merged.set(chunk.chunkId, chunk);
      }
    }
  }

  const sorted = rankForUse(filterRetrievalCandidates([...merged.values()], message));
  let relevant = filterChunksByThreshold(sorted);

  if (relevant.length === 0 && sorted.length > 0 && sorted[0].score >= CHAT_CONFIG.similarityFloor) {
    relevant = sorted.slice(0, CHAT_CONFIG.maxContextChunks);
  }

  return relevant;
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

function userAskedAboutLegal(message: string): boolean {
  return /\b(privacy|terms|gdpr|cookie|legal|villkor|integritet|användarvillkor)\b/i.test(message);
}

/** Drop legal pages and other low-value matches unless the user asked for them. */
export function filterRetrievalCandidates(
  chunks: RetrievedChunk[],
  userMessage: string,
): RetrievedChunk[] {
  const legalOk = userAskedAboutLegal(userMessage);
  return chunks.filter((c) => {
    if (c.sourceType === "legal" && !legalOk) return false;
    return true;
  });
}

function sourceDisplayPriority(chunk: RetrievedChunk): number {
  if (chunk.sourceType === "service" || chunk.sourceType === "expertise" || chunk.sourceType === "product") {
    return 0;
  }
  if (chunk.sourceType === "company" && chunk.sourceKey === "contact") return 1;
  if (chunk.sourceType === "company") return 2;
  if (chunk.sourceKey === "capability-bridge") return 3;
  if (chunk.sourceType === "blog") return 4;
  if (chunk.sourceType === "legal") return 9;
  return 5;
}

function rankForUse(chunks: RetrievedChunk[]): RetrievedChunk[] {
  return [...chunks].sort((a, b) => {
    const scoreGap = b.score - a.score;
    if (Math.abs(scoreGap) > 0.04) return scoreGap;
    return sourceDisplayPriority(a) - sourceDisplayPriority(b);
  });
}

/** Chunks fed to the model — capped and de-noised. */
export function prepareContextChunks(
  chunks: RetrievedChunk[],
  userMessage: string,
  limit = CHAT_CONFIG.maxContextChunks,
): RetrievedChunk[] {
  return rankForUse(filterRetrievalCandidates(dedupeSources(chunks), userMessage)).slice(0, limit);
}

/** At most 2 highly relevant page links shown under the answer. */
export function selectDisplaySources(
  chunks: RetrievedChunk[],
  userMessage: string,
  limit = CHAT_CONFIG.maxDisplaySources,
): RetrievedChunk[] {
  const minScore = CHAT_CONFIG.citationMinScore;
  const ranked = rankForUse(filterRetrievalCandidates(dedupeSources(chunks), userMessage)).filter(
    (c) => c.score >= minScore,
  );

  if (ranked.length === 0) return [];

  const topScore = ranked[0].score;
  const relativeMin = topScore - 0.12;

  return ranked.filter((c) => c.score >= relativeMin).slice(0, limit);
}
