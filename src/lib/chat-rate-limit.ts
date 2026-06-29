import { and, eq, gte, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { chatMessages } from "@/db/schema";
import { CHAT_CONFIG } from "@/lib/chat-config";

export async function countRecentUserMessages(sessionId: string): Promise<number> {
  const db = getDb();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(chatMessages)
    .where(
      and(
        eq(chatMessages.sessionId, sessionId),
        eq(chatMessages.role, "user"),
        gte(chatMessages.createdAt, oneHourAgo),
      ),
    );
  return row?.count ?? 0;
}

export async function isRateLimited(sessionId: string): Promise<boolean> {
  const count = await countRecentUserMessages(sessionId);
  return count >= CHAT_CONFIG.maxMessagesPerHour;
}
