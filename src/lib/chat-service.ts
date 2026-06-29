import { createHash, randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import {
  chatDocuments,
  chatMessages,
  chatMessageCitations,
  chatSessions,
} from "@/db/schema";
import type { Locale } from "@/i18n/config";
import { CHAT_CONFIG } from "@/lib/chat-config";
import { buildChatSystemPrompt, buildContextBlock } from "@/lib/chat-prompts";
import { classifyChatIntent, isConversationalIntent } from "@/lib/chat-intent";
import {
  dedupeSources,
  filterChunksByThreshold,
  retrieveChunks,
  type RetrievedChunk,
} from "@/lib/chat-retrieval";
import { streamChatCompletion, type ChatCompletionMessage } from "@/lib/chat-openai";

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex");
}

export async function getOrCreateSession(
  sessionId: string | null,
  locale: Locale,
  ipHash: string | null,
): Promise<string> {
  const db = getDb();
  if (sessionId) {
    const [existing] = await db
      .select({ id: chatSessions.id })
      .from(chatSessions)
      .where(eq(chatSessions.id, sessionId))
      .limit(1);
    if (existing) {
      await db
        .update(chatSessions)
        .set({ lastActiveAt: new Date(), locale })
        .where(eq(chatSessions.id, existing.id));
      return existing.id;
    }
  }

  const id = randomUUID();
  await db.insert(chatSessions).values({ id, locale, ipHash });
  return id;
}

export async function loadRecentHistory(sessionId: string): Promise<ChatCompletionMessage[]> {
  const db = getDb();
  const rows = await db
    .select({ role: chatMessages.role, content: chatMessages.content })
    .from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(chatMessages.createdAt)
    .limit(CHAT_CONFIG.maxHistoryTurns * 2);

  return rows
    .filter((r) => r.role === "user" || r.role === "assistant")
    .map((r) => ({
      role: r.role as "user" | "assistant",
      content: r.content,
    }));
}

export type ChatSource = {
  title: string;
  urlPath: string;
  sourceType: string;
};

export async function saveAssistantMessage(
  sessionId: string,
  content: string,
  refused: boolean,
  model: string | null,
  latencyMs: number,
  chunks: RetrievedChunk[],
): Promise<string> {
  const db = getDb();
  const [row] = await db
    .insert(chatMessages)
    .values({
      sessionId,
      role: "assistant",
      content,
      refused,
      model,
      latencyMs,
    })
    .returning({ id: chatMessages.id });

  if (chunks.length > 0) {
    await db.insert(chatMessageCitations).values(
      chunks.map((c) => ({
        messageId: row.id,
        chunkId: c.chunkId,
        score: c.score,
      })),
    );
  }

  return row.id;
}

export async function saveUserMessage(sessionId: string, content: string): Promise<void> {
  const db = getDb();
  await db.insert(chatMessages).values({ sessionId, role: "user", content });
}

export async function runChatTurn(
  sessionId: string,
  locale: Locale,
  userMessage: string,
  onToken: (token: string) => void,
): Promise<{ content: string; sources: ChatSource[]; refused: boolean; model: string | null }> {
  const started = Date.now();
  const intent = classifyChatIntent(userMessage);
  const conversational = isConversationalIntent(intent);

  const searchQuery = conversational
    ? "PrequaliQ company services products expertise contact overview"
    : userMessage;

  const retrieved = await retrieveChunks(searchQuery, locale, conversational ? 6 : CHAT_CONFIG.topK);
  let relevant = conversational
    ? retrieved.slice(0, 4)
    : filterChunksByThreshold(retrieved);

  if (!conversational && relevant.length === 0) {
    return { content: "", sources: [], refused: true, model: null };
  }

  if (conversational && relevant.length === 0) {
    return { content: "", sources: [], refused: true, model: null };
  }

  const contextChunks = relevant.map((c, i) => ({
    index: i + 1,
    title: c.title,
    urlPath: c.urlPath,
    sourceType: c.sourceType,
    content: c.content,
  }));

  const system = buildChatSystemPrompt(locale, conversational ? "conversational" : "rag");
  const context = buildContextBlock(contextChunks);
  const history = await loadRecentHistory(sessionId);

  const messages: ChatCompletionMessage[] = [
    { role: "system", content: system },
    { role: "system", content: `CONTEXT:\n\n${context}` },
    ...history.slice(0, -1),
    { role: "user", content: userMessage },
  ];

  const { content, model } = await streamChatCompletion(messages, onToken);
  const sources = dedupeSources(relevant).map((c) => ({
    title: c.title,
    urlPath: c.urlPath,
    sourceType: c.sourceType,
  }));

  const latencyMs = Date.now() - started;
  await saveAssistantMessage(sessionId, content, false, model, latencyMs, relevant);

  return { content, sources, refused: false, model };
}

/** For health / admin — document count */
export async function countActiveDocuments(): Promise<number> {
  const db = getDb();
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(chatDocuments)
    .where(eq(chatDocuments.isActive, true));
  return row?.count ?? 0;
}
