import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

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

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log("[chat:ensure] DATABASE_URL not set — skip");
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.log("[chat:ensure] OPENAI_API_KEY not set — skip chat indexing");
    return;
  }

  const sql = postgres(connectionString, { max: 1 });
  try {
    const [row] = await sql<{ count: string }[]>`
      SELECT COUNT(*)::text AS count FROM chat_chunks WHERE embedding IS NOT NULL
    `;
    const count = Number(row?.count ?? 0);
    if (count > 0) {
      console.log(`[chat:ensure] Knowledge index ready (${count} chunks) — skip`);
      return;
    }

    console.log("[chat:ensure] No chat chunks found — running index…");
    execSync("npx tsx scripts/index-chat-knowledge.ts", {
      cwd: projectRoot,
      stdio: "inherit",
      env: process.env,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("[chat:ensure] Index check failed (non-fatal):", message);
  } finally {
    await sql.end();
  }
}

main();
