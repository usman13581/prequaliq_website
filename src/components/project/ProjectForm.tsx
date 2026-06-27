"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/i18n/LanguageProvider";
import { MeetingScheduler } from "@/components/project/MeetingScheduler";

type ProjectFormProps = {
  onClose?: () => void;
};

export function ProjectForm({ onClose }: ProjectFormProps) {
  const { locale, messages: t } = useLanguage();
  const f = t.project.form;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scheduleMeeting, setScheduleMeeting] = useState(false);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          projectType: data.get("projectType"),
          timeline: data.get("timeline"),
          budget: data.get("budget"),
          description: data.get("description"),
          scheduleMeeting,
          meetingDate: scheduleMeeting ? meetingDate : null,
          meetingTime: scheduleMeeting ? meetingTime : null,
          locale,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Request failed");
      }

      setSubmitted(true);
      form.reset();
      setScheduleMeeting(false);
      setMeetingDate("");
      setMeetingTime("");
    } catch (err) {
      const message = err instanceof Error ? err.message : f.errorMessage;
      setError(message === "Request failed" ? f.errorMessage : message);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-accent-subtle border border-accent/20 rounded-2xl text-center p-8">
        <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
        <p className="text-xl font-bold text-foreground mb-2">{f.successTitle}</p>
        <p className="text-muted">{f.successMessage}</p>
        {onClose && (
          <Button type="button" className="mt-6 w-full sm:w-auto" onClick={onClose}>
            {t.common.close}
          </Button>
        )}
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{f.errorTitle}</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.fullName} <span className="text-accent">{f.required}</span>
          </label>
          <input
            id="project-name"
            name="name"
            type="text"
            required
            disabled={submitting}
            className={inputClass}
            placeholder={f.placeholders.fullName}
          />
        </div>
        <div>
          <label htmlFor="project-email" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.emailAddress} <span className="text-accent">{f.required}</span>
          </label>
          <input
            id="project-email"
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
        <label htmlFor="project-company" className="block text-sm font-medium text-foreground mb-2">
          {f.labels.company}
        </label>
        <input
          id="project-company"
          name="company"
          type="text"
          disabled={submitting}
          className={inputClass}
          placeholder={f.placeholders.company}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="project-type" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.projectType} <span className="text-accent">{f.required}</span>
          </label>
          <select
            id="project-type"
            name="projectType"
            required
            disabled={submitting}
            className={inputClass}
            defaultValue="web-mobile"
          >
            <option value="web-mobile">{f.options.projectTypes.webMobile}</option>
            <option value="enterprise">{f.options.projectTypes.enterprise}</option>
            <option value="integration">{f.options.projectTypes.integration}</option>
            <option value="erp">{f.options.projectTypes.erp}</option>
            <option value="consulting">{f.options.projectTypes.consulting}</option>
            <option value="other">{f.options.projectTypes.other}</option>
          </select>
        </div>
        <div>
          <label htmlFor="project-timeline" className="block text-sm font-medium text-foreground mb-2">
            {f.labels.timeline}
          </label>
          <select id="project-timeline" name="timeline" disabled={submitting} className={inputClass} defaultValue="">
            <option value="">{f.options.timeline.notSpecified}</option>
            <option value="asap">{f.options.timeline.asap}</option>
            <option value="1-3-months">{f.options.timeline.oneToThree}</option>
            <option value="3-6-months">{f.options.timeline.threeToSix}</option>
            <option value="6-plus-months">{f.options.timeline.sixPlus}</option>
            <option value="flexible">{f.options.timeline.flexible}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="project-budget" className="block text-sm font-medium text-foreground mb-2">
          {f.labels.budget}
        </label>
        <select id="project-budget" name="budget" disabled={submitting} className={inputClass} defaultValue="">
          <option value="">{f.options.budget.notSpecified}</option>
          <option value="under-50k">{f.options.budget.under50k}</option>
          <option value="50-150k">{f.options.budget.fiftyTo150k}</option>
          <option value="150-500k">{f.options.budget.oneFiftyTo500k}</option>
          <option value="500k-plus">{f.options.budget.fiveHundredPlus}</option>
          <option value="not-sure">{f.options.budget.notSure}</option>
        </select>
      </div>

      <div>
        <label htmlFor="project-description" className="block text-sm font-medium text-foreground mb-2">
          {f.labels.description} <span className="text-accent">{f.required}</span>
        </label>
        <textarea
          id="project-description"
          name="description"
          rows={5}
          required
          disabled={submitting}
          className={`${inputClass} resize-y`}
          placeholder={f.placeholders.description}
        />
      </div>

      <MeetingScheduler
        enabled={scheduleMeeting}
        onEnabledChange={setScheduleMeeting}
        meetingDate={meetingDate}
        onMeetingDateChange={setMeetingDate}
        meetingTime={meetingTime}
        onMeetingTimeChange={setMeetingTime}
        disabled={submitting}
        labels={f.meeting}
        inputClass={inputClass}
      />

      <Button type="submit" className="w-full" disabled={submitting}>
        <Send className="w-4 h-4" />
        {submitting ? f.submitting : f.submit}
      </Button>
    </form>
  );
}
