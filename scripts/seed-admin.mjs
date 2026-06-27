import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, scryptSync } from "node:crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

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

const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!connectionString) {
    console.error("[seed-admin] DATABASE_URL is not set");
    process.exit(1);
  }

  if (!password) {
    console.warn("[seed-admin] ADMIN_PASSWORD not set — skipping admin user creation");
    process.exit(0);
  }

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  const existing = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);

  if (existing.length > 0) {
    console.log(`[seed-admin] Admin user "${username}" already exists — skipping`);
    await sql.end();
    return;
  }

  await db.insert(adminUsers).values({
    username,
    passwordHash: hashPassword(password),
  });

  console.log(`[seed-admin] Created admin user "${username}"`);
  await sql.end();
}

main().catch((error) => {
  console.error("[seed-admin] Failed:", error);
  process.exit(1);
});
