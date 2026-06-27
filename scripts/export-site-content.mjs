/**
 * Export all English site copy to docs/site-content-proofread-en.md
 * Run: npm run content:export
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { en } from "../src/i18n/locales/en.ts";
import { expertiseEn } from "../src/i18n/locales/expertise-en.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "docs", "site-content-proofread-en.md");

/** en.ts imports expertise-en — use a shallow clone without re-importing en module graph issues */
const messages = structuredClone(en);
messages.expertise = {
  ...en.expertise,
  items: expertiseEn,
};

const lines = [
  "# PrequaliQ — Site content (English) for proofreading",
  "",
  "Generated from `src/i18n/locales/en.ts` and `expertise-en.ts`.",
  "",
  "**How to use:** Edit this file with your corrections. Send it back and we will update the site copy.",
  "",
  "---",
  "",
];

function slugify(pathParts) {
  return pathParts.join(" › ");
}

function walk(value, pathParts) {
  if (value === null || value === undefined) return;

  if (typeof value === "string") {
    const key = slugify(pathParts);
    lines.push(`## ${key}`, "", value, "", "---", "");
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (typeof item === "string") {
        lines.push(`- ${item}`);
      } else if (typeof item === "object" && item !== null) {
        lines.push("");
        lines.push(`### ${slugify([...pathParts, `[${index}]`])}`, "");
        walk(item, [...pathParts, String(index)]);
      }
    });
    if (value.length > 0 && value.every((v) => typeof v === "string")) {
      lines.push("", "---", "");
    }
    return;
  }

  if (typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walk(child, [...pathParts, key]);
    }
  }
}

/** Page-oriented sections for easier proofreading */
const pageOrder = [
  ["site"],
  ["nav"],
  ["footer"],
  ["common"],
  ["home"],
  ["expertise"],
  ["services"],
  ["products"],
  ["contact"],
  ["legal"],
];

lines.push("# By page / section", "");

for (const [section] of pageOrder) {
  if (messages[section]) {
    lines.push(`# ${section.toUpperCase()}`, "");
    walk(messages[section], [section]);
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`Wrote ${path.relative(root, outPath)} (${lines.length} lines)`);
