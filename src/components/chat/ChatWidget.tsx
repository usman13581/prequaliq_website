"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Send, Sparkles, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ChatMarkdown } from "@/components/chat/ChatMarkdown";

type ChatSource = {
  title: string;
  urlPath: string;
  sourceType: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
};

export function ChatWidget() {
  const { locale, messages } = useLanguage();
  const w = messages.chat.widget;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState<boolean | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/chat/health")
      .then((r) => r.json())
      .then((data) => setReady(Boolean(data.ready)))
      .catch(() => setReady(false));
  }, []);

  useEffect(() => {
    if (open && !loading) inputRef.current?.focus();
  }, [open, loading]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [chatMessages, loading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };
      const assistantId = `a-${Date.now()}`;
      setChatMessages((prev) => [...prev, userMsg, { id: assistantId, role: "assistant", content: "" }]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, locale }),
        });

        if (!res.ok) {
          const err = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(err.error ?? w.error);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error(w.error);

        const decoder = new TextDecoder();
        let buffer = "";
        let sources: ChatSource[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data: ")) continue;
            const payload = JSON.parse(line.slice(6)) as {
              type: string;
              text?: string;
              sources?: ChatSource[];
              message?: string;
            };

            if (payload.type === "token" && payload.text) {
              setChatMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + payload.text } : m,
                ),
              );
            }
            if (payload.type === "done" && payload.sources) {
              sources = payload.sources;
            }
            if (payload.type === "error") {
              throw new Error(payload.message ?? w.error);
            }
          }
        }

        setChatMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, sources } : m)),
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : w.error;
        setChatMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: message } : m)),
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, locale, w.error],
  );

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {open && (
          <div
            className="flex h-[min(32rem,70vh)] w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            role="dialog"
            aria-label={w.title}
          >
            <header className="flex items-start justify-between gap-2 border-b border-border bg-primary px-4 py-3 text-white">
              <div>
                <h2 className="text-sm font-semibold">{w.title}</h2>
                <p className="mt-0.5 text-xs text-white/80">{w.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-white/90 hover:bg-white/10"
                aria-label={w.close}
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {ready === false && (
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">{w.notReady}</p>
              )}

              {chatMessages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted">{w.disclaimer}</p>
                  <div className="flex flex-wrap gap-2">
                    {w.suggested.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs text-foreground hover:border-accent/40"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-white"
                        : "bg-muted/30 text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      msg.content ? (
                        <ChatMarkdown content={msg.content} />
                      ) : null
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 border-t border-border/50 pt-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {w.sources}
                        </p>
                        <ul className="mt-1 space-y-1">
                          {msg.sources.map((s) => (
                            <li key={`${s.urlPath}-${s.title}`}>
                              <Link
                                href={s.urlPath}
                                className="text-xs text-accent hover:underline"
                                onClick={() => setOpen(false)}
                              >
                                {s.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <p className="text-xs text-muted animate-pulse">{w.thinking}</p>
              )}
            </div>

            <form
              className="border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  rows={2}
                  maxLength={500}
                  placeholder={w.placeholder}
                  disabled={loading || ready === false}
                  className="min-h-[2.5rem] flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim() || ready === false}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white disabled:opacity-50"
                  aria-label={w.send}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40"
          aria-label={w.openLabel}
        >
          {!open && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/40 [animation-duration:2.5s]" />
          )}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Sparkles className="h-5 w-5 animate-pulse [animation-duration:2s]" />
          )}
          <span className="hidden sm:inline">{w.openLabel}</span>
        </button>
      </div>
    </>
  );
}
