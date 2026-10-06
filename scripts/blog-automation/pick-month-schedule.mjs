#!/usr/bin/env node
/**
 * Emit a monthly blog schedule JSON: one slot per service.
 * Usage:
 *   node scripts/blog-automation/pick-month-schedule.mjs
 *   node scripts/blog-automation/pick-month-schedule.mjs 2026 10
 *   WRITE_SCHEDULE=1 node scripts/blog-automation/pick-month-schedule.mjs 2026 10
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SERVICES = [
  "web-and-mobile-apps",
  "custom-software",
  "ui-ux-design",
  "cloud-solutions",
  "system-integration",
  "legacy-modernization",
  "ai-solutions",
  "data-analytics",
  "dedicated-teams",
  "it-consulting",
  "maintenance-support",
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scheduleDir = path.join(__dirname, "..", "blog-schedule");

function parseArgs(argv) {
  const now = new Date();
  let year = now.getUTCFullYear();
  let month = now.getUTCMonth() + 1;
  if (argv[0] && argv[1]) {
    year = Number(argv[0]);
    month = Number(argv[1]);
  }
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error("Usage: node pick-month-schedule.mjs [YYYY MM]");
  }
  return { year, month };
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function next() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromYearMonth(year, month) {
  return ((year * 100 + month) ^ 0xb105ced) >>> 0;
}

/**
 * Stockholm offset for a local civil date at noon (handles DST).
 * Returns "+01:00" or "+02:00".
 */
function stockholmOffsetForDate(year, month, day) {
  const noonUtcGuess = Date.UTC(year, month - 1, day, 10, 0, 0);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Stockholm",
    timeZoneName: "shortOffset",
  });
  const parts = fmt.formatToParts(new Date(noonUtcGuess));
  const tz = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+1";
  const m = tz.match(/GMT([+-]\d+)(?::(\d+))?/i);
  if (!m) return "+01:00";
  const hours = Number(m[1]);
  const mins = m[2] ? Number(m[2]) : 0;
  const sign = hours >= 0 ? "+" : "-";
  const absH = Math.abs(hours);
  return `${sign}${String(absH).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function isStockholmWeekday(year, month, day) {
  const offset = stockholmOffsetForDate(year, month, day);
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T12:00:00${offset}`;
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Stockholm",
    weekday: "short",
  }).format(new Date(iso));
  return wd !== "Sat" && wd !== "Sun";
}

function stockholmWeekdays(year, month) {
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const days = [];
  for (let d = 1; d <= last; d++) {
    if (isStockholmWeekday(year, month, d)) days.push(d);
  }
  return days;
}

function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickTime(rand) {
  const hour = 9 + Math.floor(rand() * 8); // 9..16
  const minute = Math.floor(rand() * 60);
  return { hour, minute };
}

function buildSchedule(year, month) {
  const rand = mulberry32(seedFromYearMonth(year, month));
  const weekdays = stockholmWeekdays(year, month);
  if (weekdays.length === 0) {
    throw new Error(`No weekdays in ${year}-${month}`);
  }

  const services = shuffle(SERVICES, rand);
  const dayOrder = shuffle(weekdays, rand);
  /** @type {Set<string>} */
  const usedKeys = new Set();
  const slots = [];

  for (let i = 0; i < services.length; i++) {
    const serviceSlug = services[i];
    const day = dayOrder[i % dayOrder.length];
    let hour;
    let minute;
    let key;
    let attempts = 0;
    do {
      ({ hour, minute } = pickTime(rand));
      key = `${day}-${hour}-${minute}`;
      attempts++;
    } while (usedKeys.has(key) && attempts < 50);
    usedKeys.add(key);

    const offset = stockholmOffsetForDate(year, month, day);
    const publishAt = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00${offset}`;
    slots.push({
      publishAt,
      serviceSlug,
      status: "planned",
    });
  }

  slots.sort((a, b) => a.publishAt.localeCompare(b.publishAt));
  return { year, month, slots };
}

function main() {
  const { year, month } = parseArgs(process.argv.slice(2));
  const schedule = buildSchedule(year, month);

  if (schedule.slots.length !== SERVICES.length) {
    throw new Error(`Expected ${SERVICES.length} slots, got ${schedule.slots.length}`);
  }
  const slugs = new Set(schedule.slots.map((s) => s.serviceSlug));
  if (slugs.size !== SERVICES.length) {
    throw new Error("Duplicate or missing serviceSlug in slots");
  }

  const json = `${JSON.stringify(schedule, null, 2)}\n`;
  process.stdout.write(json);

  if (process.env.WRITE_SCHEDULE === "1") {
    fs.mkdirSync(scheduleDir, { recursive: true });
    const file = path.join(
      scheduleDir,
      `${year}-${String(month).padStart(2, "0")}.json`,
    );
    fs.writeFileSync(file, json, "utf8");
    console.error(`Wrote ${file}`);
  }
}

main();
