import OpenAI from "openai";
import { CHAT_CONFIG, getOpenAIApiKey } from "@/lib/chat-config";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) client = new OpenAI({ apiKey: getOpenAIApiKey() });
  return client;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const openai = getClient();
  const response = await openai.embeddings.create({
    model: CHAT_CONFIG.embeddingModel,
    input: texts,
    dimensions: CHAT_CONFIG.embeddingDimensions,
  });
  return response.data.sort((a, b) => a.index - b.index).map((row) => row.embedding);
}

export async function embedQuery(text: string): Promise<number[]> {
  const [vector] = await embedTexts([text]);
  return vector;
}

export function vectorLiteral(values: number[]): string {
  return `[${values.join(",")}]`;
}

export type ChatCompletionMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function streamChatCompletion(
  messages: ChatCompletionMessage[],
  onToken: (token: string) => void,
): Promise<{ content: string; model: string }> {
  const openai = getClient();
  const stream = await openai.chat.completions.create({
    model: CHAT_CONFIG.chatModel,
    messages,
    max_tokens: CHAT_CONFIG.maxOutputTokens,
    temperature: 0.3,
    stream: true,
  });

  let content = "";
  for await (const part of stream) {
    const token = part.choices[0]?.delta?.content ?? "";
    if (token) {
      content += token;
      onToken(token);
    }
  }

  return { content, model: CHAT_CONFIG.chatModel };
}
