export type ChatIntent = "greeting" | "thanks" | "goodbye" | "help" | "substantive";

const GREETING =
  /^(hi|hello|hey|hiya|yo|howdy|good\s+(morning|afternoon|evening)|greetings|salam|assalamu\s*alaikum|marhaba|ahlan|namaste|hej|hallå|tjena)$/i;

const THANKS = /^(thanks?|thank\s+you|thx|ty|tack|tack\s+så\s+mycket|appreciate\s+it)$/i;

const GOODBYE = /^(bye|goodbye|see\s+you|take\s+care|hej\s+då|adjö)$/i;

const HELP =
  /^(help|what\s+can\s+you\s+do|what\s+do\s+you\s+do|who\s+are\s+you|how\s+can\s+you\s+help|how\s+does\s+this\s+work)$/i;

/** Short social messages that should get a friendly reply, not a documentation refusal. */
export function classifyChatIntent(message: string): ChatIntent {
  const text = message.trim().replace(/[!?.…]+$/g, "").trim();
  if (!text) return "substantive";
  if (text.length <= 40 && GREETING.test(text)) return "greeting";
  if (text.length <= 60 && THANKS.test(text)) return "thanks";
  if (text.length <= 40 && GOODBYE.test(text)) return "goodbye";
  if (text.length <= 80 && HELP.test(text)) return "help";
  return "substantive";
}

export function isConversationalIntent(intent: ChatIntent): boolean {
  return intent !== "substantive";
}
