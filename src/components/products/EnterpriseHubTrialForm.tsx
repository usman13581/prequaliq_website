"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LegalModal } from "@/components/ui/LegalModal";
import { Button } from "@/components/ui/Button";
import type { LegalDocumentType } from "@/lib/legal-content";

type DemoRequestResponse = {
  ok?: boolean;
};

export function EnterpriseHubTrialForm() {
  const { messages: t } = useLanguage();
  const trial = t.products.enterpriseHub.trial;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalDocumentType | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setError(false);
    setSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/enterprise-hub/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: data.get("companyName"),
          email: data.get("email"),
          contactName: data.get("contactName"),
          phone: data.get("phone"),
          emirate: data.get("emirate"),
          approxUsers: data.get("approxUsers"),
          note: data.get("note"),
          honeypot: data.get("honeypot"),
        }),
      });

      const result = (await response.json()) as DemoRequestResponse;
      if (!response.ok || result.ok !== true) {
        throw new Error("Trial request failed");
      }

      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm disabled:opacity-60";

  if (submitted) {
    return (
      <div
        className="bg-accent-subtle border border-accent/20 rounded-2xl p-8 lg:p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-xl font-bold text-foreground mb-2">{trial.successTitle}</h3>
        <p className="text-muted leading-relaxed">{trial.successMessage}</p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-5"
        aria-busy={submitting}
      >
        {error && (
          <div
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">{trial.errorTitle}</p>
              <p className="mt-0.5">{trial.errorMessage}</p>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enterprise-trial-company" className="block text-sm font-medium text-foreground mb-2">
              {trial.fields.companyName} <span className="text-accent">{trial.required}</span>
            </label>
            <input
              id="enterprise-trial-company"
              name="companyName"
              type="text"
              required
              maxLength={255}
              autoComplete="organization"
              disabled={submitting}
              className={inputClass}
              placeholder={trial.placeholders.companyName}
            />
          </div>
          <div>
            <label htmlFor="enterprise-trial-email" className="block text-sm font-medium text-foreground mb-2">
              {trial.fields.email} <span className="text-accent">{trial.required}</span>
            </label>
            <input
              id="enterprise-trial-email"
              name="email"
              type="email"
              required
              maxLength={255}
              autoComplete="email"
              disabled={submitting}
              className={inputClass}
              placeholder={trial.placeholders.email}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enterprise-trial-contact" className="block text-sm font-medium text-foreground mb-2">
              {trial.fields.contactName} <span className="text-muted-light">({trial.optional})</span>
            </label>
            <input
              id="enterprise-trial-contact"
              name="contactName"
              type="text"
              maxLength={255}
              autoComplete="name"
              disabled={submitting}
              className={inputClass}
              placeholder={trial.placeholders.contactName}
            />
          </div>
          <div>
            <label htmlFor="enterprise-trial-phone" className="block text-sm font-medium text-foreground mb-2">
              {trial.fields.phone} <span className="text-muted-light">({trial.optional})</span>
            </label>
            <input
              id="enterprise-trial-phone"
              name="phone"
              type="tel"
              maxLength={50}
              autoComplete="tel"
              disabled={submitting}
              className={inputClass}
              placeholder={trial.placeholders.phone}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enterprise-trial-emirate" className="block text-sm font-medium text-foreground mb-2">
              {trial.fields.emirate} <span className="text-muted-light">({trial.optional})</span>
            </label>
            <input
              id="enterprise-trial-emirate"
              name="emirate"
              type="text"
              maxLength={100}
              autoComplete="address-level1"
              disabled={submitting}
              className={inputClass}
              placeholder={trial.placeholders.emirate}
            />
          </div>
          <div>
            <label htmlFor="enterprise-trial-users" className="block text-sm font-medium text-foreground mb-2">
              {trial.fields.approxUsers} <span className="text-muted-light">({trial.optional})</span>
            </label>
            <select
              id="enterprise-trial-users"
              name="approxUsers"
              defaultValue=""
              disabled={submitting}
              className={inputClass}
            >
              <option value="">{trial.teamSizePlaceholder}</option>
              {trial.teamSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="enterprise-trial-note" className="block text-sm font-medium text-foreground mb-2">
            {trial.fields.note} <span className="text-muted-light">({trial.optional})</span>
          </label>
          <textarea
            id="enterprise-trial-note"
            name="note"
            rows={4}
            maxLength={2000}
            disabled={submitting}
            className={`${inputClass} resize-y`}
            placeholder={trial.placeholders.note}
          />
        </div>

        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="enterprise-trial-honeypot">Leave this field empty</label>
          <input
            id="enterprise-trial-honeypot"
            name="honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex items-start gap-3 text-sm text-muted">
          <input
            id="enterprise-trial-consent"
            name="consent"
            type="checkbox"
            required
            disabled={submitting}
            aria-label={trial.fields.consent}
            aria-describedby="enterprise-trial-consent-copy"
            className="mt-1 h-4 w-4 flex-shrink-0 rounded border-border text-accent focus:ring-accent/30"
          />
          <p id="enterprise-trial-consent-copy" className="leading-relaxed">
            {trial.consentPrefix}{" "}
            <button
              type="button"
              className="text-accent underline underline-offset-2 hover:text-accent-hover"
              onClick={() => setLegalModal("privacy")}
            >
              {trial.consentPrivacy}
            </button>{" "}
            {trial.consentAnd}{" "}
            <button
              type="button"
              className="text-accent underline underline-offset-2 hover:text-accent-hover"
              onClick={() => setLegalModal("terms")}
            >
              {trial.consentTerms}
            </button>{" "}
            {trial.consentSuffix}
          </p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          <Send className="w-4 h-4" aria-hidden="true" />
          {submitting ? trial.submitting : trial.submit}
        </Button>
        <p className="text-xs text-muted-light text-center">{trial.privacyNotice}</p>
      </form>

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </>
  );
}
