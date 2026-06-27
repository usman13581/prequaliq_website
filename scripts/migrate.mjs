import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const migrationsFolder = path.join(projectRoot, "drizzle");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(projectRoot, ".env"));
loadEnvFile(path.join(projectRoot, ".env.local"));

function syncSchemaFallback() {
  console.log("[migrate] Running schema sync fallback (drizzle-kit push)…");
  execSync("npx drizzle-kit push --force", {
    stdio: "inherit",
    env: process.env,
  });
}

async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn("[migrate] DATABASE_URL is not set — skipping migrations.");
    return;
  }

  console.log("[migrate] Connecting to database…");
  console.log("[migrate] Applying migrations from:", migrationsFolder);

  const sql = postgres(connectionString, { max: 1, connect_timeout: 30 });
  const db = drizzle(sql);

  try {
    await migrate(db, { migrationsFolder });
    console.log("[migrate] All migrations applied successfully.");
  } catch (error) {
    const pgCode = error?.cause?.code;
    if (pgCode === "42P07") {
      console.warn("[migrate] Tables already exist — using schema sync fallback.");
      syncSchemaFallback();
    } else {
      throw error;
    }
  } finally {
    await sql.end();
  }
}

runMigrations().catch((error) => {
  console.error("[migrate] Migration failed:", error);
  process.exit(1);
});
