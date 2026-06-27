export const MEETING_TIMEZONE = "Europe/Stockholm";

export const MEETING_TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export type MeetingTimeSlot = (typeof MEETING_TIME_SLOTS)[number];

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isWeekdayInStockholm(dateStr: string): boolean {
  const [y, mo, d] = dateStr.split("-").map(Number);
  if (!y || !mo || !d) return false;

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: MEETING_TIMEZONE,
  }).format(new Date(Date.UTC(y, mo - 1, d, 12, 0)));

  return weekday !== "Sat" && weekday !== "Sun";
}

export function isFutureMeetingSlot(dateStr: string, timeStr: string): boolean {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);
  const offset = getStockholmOffsetForDate(dateStr);
  const meetingMs = Date.UTC(y, mo - 1, d, hours - offset, minutes, 0);
  return meetingMs > Date.now();
}

function getStockholmOffsetForDate(dateStr: string): number {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const utc = new Date(Date.UTC(y, mo - 1, d, 12, 0, 0));
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MEETING_TIMEZONE,
    timeZoneName: "shortOffset",
    hour: "numeric",
  }).formatToParts(utc);

  const offsetPart = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT+1";
  const match = offsetPart.match(/GMT([+-]\d+)/);
  if (!match) return 1;
  return Number.parseInt(match[1], 10);
}

export function validateMeetingSlot(dateStr: string | null, timeStr: string | null): string | null {
  if (!dateStr && !timeStr) return null;
  if (!dateStr || !timeStr) return "Both meeting date and time are required";

  if (!DATE_PATTERN.test(dateStr)) return "Invalid meeting date";
  if (!TIME_PATTERN.test(timeStr)) return "Invalid meeting time";
  if (!MEETING_TIME_SLOTS.includes(timeStr as MeetingTimeSlot)) {
    return "Meeting time must be between 9:00 AM and 5:00 PM on weekdays";
  }
  if (!isWeekdayInStockholm(dateStr)) return "Meetings are available Monday to Friday only";
  if (!isFutureMeetingSlot(dateStr, timeStr)) return "Meeting must be scheduled in the future";

  return null;
}

export function formatMeetingForDisplay(
  dateStr: string,
  timeStr: string,
  locale: "en" | "sv",
): string {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, mo - 1, d, 12, 0, 0));
  const formattedDate = new Intl.DateTimeFormat(locale === "sv" ? "sv-SE" : "en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: MEETING_TIMEZONE,
  }).format(date);

  const [hours, minutes] = timeStr.split(":").map(Number);
  const hour12 = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";
  const timeLabel =
    locale === "sv"
      ? `${String(hours).padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
      : `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;

  return `${formattedDate} at ${timeLabel} (${MEETING_TIMEZONE.replace("_", " ")})`;
}

export function minMeetingDateString(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: MEETING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(now);
}
