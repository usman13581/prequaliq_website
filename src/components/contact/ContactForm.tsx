"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2 } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

type ContactFormProps = {
  variant?: "page" | "modal";
};

export function ContactForm({ variant = "page" }: ContactFormProps) {
  const t = useTranslations();
  const f = t.contact.form;
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (variant === "page") {
      setSubmitted(true);
    }
  }

  if (submitted && variant === "page") {
    return (
      <div className="bg-accent-subtle border border-accent/20 rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <p className="text-xl font-bold text-foreground mb-2">{f.successTitle}</p>
        <p className="text-muted">{f.successMessage}</p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm";

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

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.fullName} <span className="text-accent">{f.required}</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder={f.placeholders.fullName}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.emailAddress} <span className="text-accent">{f.required}</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder={f.placeholders.emailAddress}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
          {f.labels.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className={inputClass}
          placeholder={f.placeholders.company}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          {f.labels.subject}
        </label>
        <select id="subject" name="subject" className={inputClass}>
          <option value="general">{f.options.general}</option>
          <option value="app-development">{f.options.applicationDevelopment}</option>
          <option value="cloud-integration">{f.options.cloudIntegration}</option>
          <option value="ai-automation">{f.options.aiAutomation}</option>
          <option value="partnership">{f.options.partnership}</option>
          <option value="products">{f.options.products}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          {f.labels.message} <span className="text-accent">{f.required}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
          placeholder={f.placeholders.message}
        />
      </div>

      <Button type="submit" size={variant === "modal" ? "md" : "lg"} className="w-full">
        <Send className="w-4 h-4" />
        {f.submit}
      </Button>
    </form>
  );
}
