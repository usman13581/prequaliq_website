/**
 * Apply docs/site-content-proofread-en.md back to en.ts + expertise-en.ts
 * Run: npx tsx scripts/apply-site-content.mjs [path-to-md]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { en } from "../src/i18n/locales/en.ts";
import { expertiseEn } from "../src/i18n/locales/expertise-en.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mdPath = process.argv[2] ?? path.join(root, "docs", "site-content-proofread-en.md");

function parseMd(text) {
  /** @type {Map<string, string>} */
  const strings = new Map();
  /** @type {Map<string, string[]>} */
  const arrays = new Map();

  const lines = text.split("\n");
  let i = 0;
  while (i < lines.length) {
    const heading = lines[i].match(/^## (.+)$/);
    if (!heading) {
      i++;
      continue;
    }
    const key = heading[1].trim();
    i++;
    if (lines[i] === "") i++;

    const valLines = [];
    while (i < lines.length) {
      const line = lines[i];
      if (line === "---" || line.startsWith("## ") || line.startsWith("# ")) break;
      valLines.push(line);
      i++;
    }

    while (valLines.length && valLines[valLines.length - 1] === "") valLines.pop();

    if (valLines.every((l) => l.startsWith("- "))) {
      arrays.set(
        key,
        valLines.map((l) => l.slice(2)),
      );
    } else if (valLines.length > 0) {
      strings.set(key, valLines.join("\n"));
    }
  }

  return { strings, arrays };
}

function keyToParts(key) {
  return key.split(" › ").map((p) => p.trim());
}

function resolveTarget(parts) {
  if (parts[0] === "expertise") {
    // Export duplicates `items` when merging expertiseEn into messages.expertise
    if (parts[1] === "items" && parts[2] === "items") {
      return { root: expertiseEn, parts: ["items", ...parts.slice(3)] };
    }
    if (parts[1] === "items" && parts[2] === "page") {
      return { root: expertiseEn, parts: ["page", ...parts.slice(3)] };
    }
    return { root: expertiseEn, parts: parts.slice(1) };
  }

  return { root: en, parts };
}

function setAtPath(root, parts, value) {
  let cur = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur[p] === undefined) cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

function apply(parsed) {
  let applied = 0;
  for (const [key, value] of parsed.strings) {
    const parts = keyToParts(key);
    if (parts.length === 0) continue;
    const { root, parts: targetParts } = resolveTarget(parts);
    if (targetParts.length === 0) continue;
    setAtPath(root, targetParts, value);
    applied++;
  }
  for (const [key, value] of parsed.arrays) {
    const parts = keyToParts(key);
    if (parts.length === 0) continue;
    const { root, parts: targetParts } = resolveTarget(parts);
    if (targetParts.length === 0) continue;
    setAtPath(root, targetParts, value);
    applied++;
  }
  return applied;
}

function quote(s) {
  return JSON.stringify(s);
}

function emitValue(value, indent) {
  const sp = " ".repeat(indent);
  if (typeof value === "string") {
    if (value.includes("\n")) {
      return `${sp}${quote(value)}`;
    }
    return `${sp}${quote(value)}`;
  }
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === "string")) {
      return `${sp}[\n${value.map((v) => `${sp}  ${quote(v)},`).join("\n")}\n${sp}]`;
    }
    return `${sp}[\n${value
      .map((item) => `${emitValue(item, indent + 2)},`)
      .join("\n")}\n${sp}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return `${sp}{}`;
    return `${sp}{\n${entries
      .map(([k, v]) => {
        const key = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : quote(k);
        const rendered = emitValue(v, indent + 2);
        const needsMultiline = rendered.includes("\n");
        if (needsMultiline && typeof v === "string") {
          return `${sp}  ${key}:\n${rendered},`;
        }
        return `${sp}  ${key}: ${rendered.trim()},`;
      })
      .join("\n")}\n${sp}}`;
  }
  return `${sp}${String(value)}`;
}

function emitExpertiseEn() {
  return `export const expertiseEn = ${emitValue(expertiseEn, 0).trim()};\n`;
}

function emitEn() {
  const clone = structuredClone(en);
  clone.expertise = "EXPERTISE_PLACEHOLDER";

  let body = emitValue(clone, 0).trim();
  body = body.replace(
    '"EXPERTISE_PLACEHOLDER"',
    "expertiseEn",
  );

  return `import { expertiseEn } from "./expertise-en";\n\nexport const en = ${body};\n`;
}

const md = fs.readFileSync(mdPath, "utf8");
const parsed = parseMd(md);
const count = apply(parsed);

const expertisePath = path.join(root, "src/i18n/locales/expertise-en.ts");
const enPath = path.join(root, "src/i18n/locales/en.ts");

fs.writeFileSync(expertisePath, emitExpertiseEn(), "utf8");
fs.writeFileSync(enPath, emitEn(), "utf8");

console.log(`Applied ${count} entries from ${path.basename(mdPath)}`);
console.log(`Wrote ${path.relative(root, expertisePath)}`);
console.log(`Wrote ${path.relative(root, enPath)}`);
