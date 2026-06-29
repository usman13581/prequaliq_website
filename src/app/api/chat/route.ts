import { cookies } from "next/headers";
import type { Locale } from "@/i18n/config";
import { CHAT_CONFIG } from "@/lib/chat-config";
import { REFUSAL_MESSAGES } from "@/lib/chat-prompts";
import { isRateLimited } from "@/lib/chat-rate-limit";
import {
  getOrCreateSession,
  hashIp,
  runChatTurn,
  saveAssistantMessage,
  saveUserMessage,
  type ChatSource,
} from "@/lib/chat-service";

type ChatPayload = {
  message?: string;
  locale?: string;
};

function sseLine(data: Record<string, unknown>): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request) {
  let body: ChatPayload;
  try {
    body = (await request.json()) as ChatPayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const locale: Locale = body.locale === "sv" ? "sv" : "en";
  const refusal = REFUSAL_MESSAGES[locale];
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
  }

  if (message.length > CHAT_CONFIG.maxUserMessageLength) {
    return new Response(JSON.stringify({ error: refusal.tooLong }), { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: refusal.genericError }), { status: 503 });
  }

  const cookieStore = await cookies();
  const existingSession = cookieStore.get(CHAT_CONFIG.sessionCookie)?.value ?? null;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  let sessionId: string;
  try {
    sessionId = await getOrCreateSession(existingSession, locale, hashIp(ip));
  } catch {
    return new Response(JSON.stringify({ error: refusal.genericError }), { status: 503 });
  }

  if (await isRateLimited(sessionId)) {
    return new Response(JSON.stringify({ error: refusal.rateLimit }), { status: 429 });
  }

  const encoder = new TextEncoder();
  const needsSessionCookie = !existingSession || existingSession !== sessionId;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        await saveUserMessage(sessionId, message);

        const result = await runChatTurn(sessionId, locale, message, (token) => {
          controller.enqueue(encoder.encode(sseLine({ type: "token", text: token })));
        });

        if (result.refused) {
          const refusalText = refusal.noContext;
          await saveAssistantMessage(sessionId, refusalText, true, null, 0, []);
          controller.enqueue(encoder.encode(sseLine({ type: "token", text: refusalText })));
          controller.enqueue(
            encoder.encode(
              sseLine({
                type: "done",
                refused: true,
                sources: [],
                sessionId,
              }),
            ),
          );
          controller.close();
          return;
        }

        const sources: ChatSource[] = result.sources;
        controller.enqueue(
          encoder.encode(
            sseLine({
              type: "done",
              refused: false,
              sources,
              sessionId,
            }),
          ),
        );
        controller.close();
      } catch (error) {
        console.error("[chat]", error);
        controller.enqueue(
          encoder.encode(sseLine({ type: "error", message: refusal.genericError })),
        );
        controller.close();
      }
    },
  });

  const headers: Record<string, string> = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  if (needsSessionCookie) {
    headers["Set-Cookie"] =
      `${CHAT_CONFIG.sessionCookie}=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`;
  }

  return new Response(stream, { headers });
}
