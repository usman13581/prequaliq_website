import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(projectRoot, ".env"));
loadEnvFile(path.join(projectRoot, ".env.local"));

function main() {
  if (!process.env.DATABASE_URL) {
    console.log("[chat:ensure] DATABASE_URL not set — skip");
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.log("[chat:ensure] OPENAI_API_KEY not set — skip chat indexing");
    return;
  }

  // The indexer is incremental: it only re-embeds documents whose content
  // changed (by hash) and skips the rest, so running it on every start keeps
  // the knowledge base in sync with content/code changes at minimal cost.
  console.log("[chat:ensure] Running incremental chat index…");
  try {
    execSync("npx tsx scripts/index-chat-knowledge.ts", {
      cwd: projectRoot,
      stdio: "inherit",
      env: process.env,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[chat:ensure] Index run failed (non-fatal):", message);
  }
}

main();
