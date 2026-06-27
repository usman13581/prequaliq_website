"use client";

import {
  MEETING_TIME_SLOTS,
  MEETING_TIMEZONE,
  minMeetingDateString,
} from "@/lib/meeting";

type MeetingSchedulerProps = {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  meetingDate: string;
  onMeetingDateChange: (value: string) => void;
  meetingTime: string;
  onMeetingTimeChange: (value: string) => void;
  disabled?: boolean;
  labels: {
    toggle: string;
    toggleHint: string;
    date: string;
    time: string;
    timezone: string;
    selectDate: string;
    selectTime: string;
  };
  inputClass: string;
};

export function MeetingScheduler({
  enabled,
  onEnabledChange,
  meetingDate,
  onMeetingDateChange,
  meetingTime,
  onMeetingTimeChange,
  disabled = false,
  labels,
  inputClass,
}: MeetingSchedulerProps) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4 space-y-4">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => onEnabledChange(event.target.checked)}
          disabled={disabled}
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-accent/30"
        />
        <span>
          <span className="block text-sm font-medium text-foreground">{labels.toggle}</span>
          <span className="block text-xs text-muted mt-1">{labels.toggleHint}</span>
        </span>
      </label>

      {enabled && (
        <div className="grid sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label htmlFor="project-meeting-date" className="block text-sm font-medium text-foreground mb-2">
              {labels.date}
            </label>
            <input
              id="project-meeting-date"
              name="meetingDate"
              type="date"
              required={enabled}
              min={minMeetingDateString()}
              value={meetingDate}
              onChange={(event) => onMeetingDateChange(event.target.value)}
              disabled={disabled}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="project-meeting-time" className="block text-sm font-medium text-foreground mb-2">
              {labels.time}
            </label>
            <select
              id="project-meeting-time"
              name="meetingTime"
              required={enabled}
              value={meetingTime}
              onChange={(event) => onMeetingTimeChange(event.target.value)}
              disabled={disabled}
              className={inputClass}
            >
              <option value="">{labels.selectTime}</option>
              {MEETING_TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted mt-2">
              {labels.timezone.replace("{timezone}", MEETING_TIMEZONE.replace("_", " "))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
