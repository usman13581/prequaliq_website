export const CHAT_CONFIG = {
  sessionCookie: "pq_chat_session",
  embeddingModel: process.env.CHAT_EMBEDDING_MODEL ?? "text-embedding-3-small",
  chatModel: process.env.CHAT_MODEL ?? "gpt-4o-mini",
  embeddingDimensions: 1536,
  maxUserMessageLength: 500,
  maxOutputTokens: 600,
  topK: 8,
  similarityThreshold: Number(process.env.CHAT_SIMILARITY_THRESHOLD ?? "0.68"),
  maxMessagesPerHour: Number(process.env.CHAT_MAX_MESSAGES_PER_HOUR ?? "25"),
  maxHistoryTurns: 4,
  embedBatchSize: 50,
} as const;

export function getOpenAIApiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not configured");
  return key;
}
