"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

type ContactFormProps = {
  variant?: "page" | "modal";
  onSuccess?: () => void;
};

export function ContactForm({ variant = "page", onSuccess }: ContactFormProps) {
  const { locale, messages: t } = useLanguage();
  const f = t.contact.form;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          subject: data.get("subject"),
          message: data.get("message"),
          source: variant === "modal" ? "get_started_modal" : "contact_page",
          locale,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Request failed");
      }

      setSubmitted(true);
      form.reset();
      onSuccess?.();
    } catch {
      setError(f.errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className={`bg-accent-subtle border border-accent/20 rounded-2xl text-center ${
          variant === "modal" ? "p-8" : "p-10"
        }`}
      >
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <p className="text-xl font-bold text-foreground mb-2">{f.successTitle}</p>
        <p className="text-muted">{f.successMessage}</p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm disabled:opacity-60";

  const formClass =
    variant === "modal"
      ? "space-y-4"
      : "bg-card rounded-2xl p-8 border border-border shadow-sm space-y-5";

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      {variant === "page" && (
        <div className="mb-2">
          <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
          <p className="text-sm text-muted mt-1">{f.responseTime}</p>
        </div>
      )}

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
          <label htmlFor={`${variant}-name`} className="block text-sm font-medium text-foreground mb-2">
            {f.labels.fullName} <span className="text-accent">{f.required}</span>
          </label>
          <input
            id={`${variant}-name`}
            name="name"
            type="text"
            required
            disabled={submitting}
            className={inputClass}
            placeholder={f.placeholders.fullName}
          />
        </div>
        <div>
          <label htmlFor={`${variant}-email`} className="block text-sm font-medium text-foreground mb-2">
            {f.labels.emailAddress} <span className="text-accent">{f.required}</span>
          </label>
          <input
            id={`${variant}-email`}
            name="email"
            type="email"
            required
            disabled={submitting}
            className={inputClass}
            placeholder={f.placeholders.emailAddress}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${variant}-company`} className="block text-sm font-medium text-foreground mb-2">
          {f.labels.company}
        </label>
        <input
          id={`${variant}-company`}
          name="company"
          type="text"
          disabled={submitting}
          className={inputClass}
          placeholder={f.placeholders.company}
        />
      </div>

      <div>
        <label htmlFor={`${variant}-subject`} className="block text-sm font-medium text-foreground mb-2">
          {f.labels.subject}
        </label>
        <select
          id={`${variant}-subject`}
          name="subject"
          disabled={submitting}
          className={inputClass}
        >
          <option value="general">{f.options.general}</option>
          <option value="app-development">{f.options.applicationDevelopment}</option>
          <option value="cloud-integration">{f.options.cloudIntegration}</option>
          <option value="ai-automation">{f.options.aiAutomation}</option>
          <option value="partnership">{f.options.partnership}</option>
          <option value="products">{f.options.products}</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${variant}-message`} className="block text-sm font-medium text-foreground mb-2">
          {f.labels.message} <span className="text-accent">{f.required}</span>
        </label>
        <textarea
          id={`${variant}-message`}
          name="message"
          rows={variant === "modal" ? 4 : 5}
          required
          disabled={submitting}
          className={`${inputClass} resize-y`}
          placeholder={f.placeholders.message}
        />
      </div>

      <Button
        type="submit"
        size={variant === "modal" ? "md" : "lg"}
        className="w-full"
        disabled={submitting}
      >
        <Send className="w-4 h-4" />
        {submitting ? f.submitting : f.submit}
      </Button>
    </form>
  );
}
