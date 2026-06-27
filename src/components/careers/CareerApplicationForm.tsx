"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, Paperclip } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function CareerApplicationForm() {
  const { locale, messages: t } = useLanguage();
  const f = t.careers.form;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("locale", locale);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: data,
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Request failed");
      }

      setSubmitted(true);
      form.reset();
      setFileName(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : f.errorMessage;
      setError(message === "Request failed" ? f.errorMessage : message);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm disabled:opacity-60";

  if (submitted) {
    return (
      <div className="bg-accent-subtle border border-accent/20 rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <p className="text-xl font-bold text-foreground mb-2">{f.successTitle}</p>
        <p className="text-muted">{f.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-5"
    >
      <div>
        <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
        <p className="text-sm text-muted mt-1">{f.subtitle}</p>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{f.errorTitle}</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="career-name" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.fullName} <span className="text-accent">{f.required}</span>
          </label>
          <input
            id="career-name"
            name="name"
            type="text"
            required
            disabled={submitting}
            className={inputClass}
            placeholder={f.placeholders.fullName}
          />
        </div>
        <div>
          <label htmlFor="career-email" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.emailAddress} <span className="text-accent">{f.required}</span>
          </label>
          <input
            id="career-email"
            name="email"
            type="email"
            required
            disabled={submitting}
            className={inputClass}
            placeholder={f.placeholders.emailAddress}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="career-phone" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.phone}
          </label>
          <input
            id="career-phone"
            name="phone"
            type="tel"
            disabled={submitting}
            className={inputClass}
            placeholder={f.placeholders.phone}
          />
        </div>
        <div>
          <label htmlFor="career-linkedin" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.linkedIn}
          </label>
          <input
            id="career-linkedin"
            name="linkedIn"
            type="url"
            disabled={submitting}
            className={inputClass}
            placeholder={f.placeholders.linkedIn}
          />
        </div>
      </div>

      <div>
        <label htmlFor="career-message" className="block text-sm font-medium text-foreground mb-2">
          {f.labels.message}
        </label>
        <textarea
          id="career-message"
          name="message"
          rows={4}
          disabled={submitting}
          className={`${inputClass} resize-y`}
          placeholder={f.placeholders.message}
        />
      </div>

      <div>
        <label htmlFor="career-cv" className="block text-sm font-medium text-foreground mb-2">
          {f.labels.cv} <span className="text-accent">{f.required}</span>
        </label>
        <div className="relative">
          <input
            id="career-cv"
            name="cv"
            type="file"
            required
            disabled={submitting}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <label
            htmlFor="career-cv"
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border border-dashed border-border bg-surface cursor-pointer hover:border-accent/40 transition-colors ${submitting ? "opacity-60 pointer-events-none" : ""}`}
          >
            <Paperclip className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm text-muted truncate">
              {fileName ?? f.placeholders.cv}
            </span>
          </label>
        </div>
        <p className="mt-2 text-xs text-muted-light">{f.cvHint}</p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        <Send className="w-4 h-4" />
        {submitting ? f.submitting : f.submit}
      </Button>
    </form>
  );
}
