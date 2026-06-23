import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsFolder = path.join(__dirname, "..", "drizzle");

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
