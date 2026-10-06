import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

/** TEMP bootstrap — remove after login works and rotate password via env. */
const BOOTSTRAP_USERNAME = "admin";
const BOOTSTRAP_PASSWORD = "Admin@123";

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

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, "hex");
  const testBuffer = scryptSync(password, salt, 64);
  if (hashBuffer.length !== testBuffer.length) return false;
  return timingSafeEqual(hashBuffer, testBuffer);
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const username = BOOTSTRAP_USERNAME;
  const password = BOOTSTRAP_PASSWORD;

  if (!connectionString) {
    console.error("[seed-admin] DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);
  const passwordHash = hashPassword(password);

  const all = await db.select().from(adminUsers);
  console.log(`[seed-admin] Hardcoded bootstrap for "${username}"; found ${all.length} existing user(s)`);

  const existing = all.find((u) => u.username === username);
  if (existing) {
    await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, existing.id));
    console.log(`[seed-admin] Updated password for "${username}"`);
  } else if (all.length === 1) {
    await db
      .update(adminUsers)
      .set({ username, passwordHash })
      .where(eq(adminUsers.id, all[0].id));
    console.log(`[seed-admin] Renamed "${all[0].username}" → "${username}" and reset password`);
  } else {
    await db.insert(adminUsers).values({ username, passwordHash });
    console.log(`[seed-admin] Created admin user "${username}"`);
  }

  const [check] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, username))
    .limit(1);

  if (!check || !verifyPassword(password, check.passwordHash)) {
    console.error(`[seed-admin] CRITICAL: could not verify hardcoded password for "${username}"`);
    await sql.end();
    process.exit(1);
  }

  console.log(`[seed-admin] OK — login with username "${username}" and hardcoded password`);
  await sql.end();
}

main().catch((error) => {
  console.error("[seed-admin] Failed:", error);
  process.exit(1);
});
