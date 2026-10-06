import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
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
  const username = (process.env.ADMIN_USERNAME ?? "admin").trim();
  const password = (process.env.ADMIN_PASSWORD ?? "").trim();
  const isProd = process.env.NODE_ENV === "production" || process.env.RAILWAY_ENVIRONMENT != null;

  console.log(
    `[seed-admin] env: hasDATABASE_URL=${Boolean(connectionString)} hasADMIN_PASSWORD=${Boolean(password)} passwordLength=${password.length} username="${username}" railway=${process.env.RAILWAY_ENVIRONMENT ?? "n/a"}`,
  );

  if (!connectionString) {
    console.error("[seed-admin] DATABASE_URL is not set");
    process.exit(1);
  }

  if (!password) {
    const msg = "[seed-admin] ADMIN_PASSWORD is not set in the running service environment";
    if (isProd) {
      console.error(msg);
      process.exit(1);
    }
    console.warn(`${msg} — skipping in non-production`);
    process.exit(0);
  }

  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);
  const passwordHash = hashPassword(password);

  // Always sync password from ADMIN_PASSWORD so Railway env is source of truth.
  const all = await db.select().from(adminUsers);
  console.log(`[seed-admin] Found ${all.length} admin user(s); syncing password for "${username}"`);

  const existing = all.find((u) => u.username === username);
  if (existing) {
    await db
      .update(adminUsers)
      .set({ passwordHash })
      .where(eq(adminUsers.id, existing.id));
    console.log(`[seed-admin] Updated password for "${username}"`);
  } else if (all.length === 1) {
    // Single legacy user under another username — rename + reset
    await db
      .update(adminUsers)
      .set({ username, passwordHash })
      .where(eq(adminUsers.id, all[0].id));
    console.log(`[seed-admin] Renamed "${all[0].username}" → "${username}" and reset password`);
  } else if (all.length > 1) {
    for (const user of all) {
      await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, user.id));
    }
    if (!all.some((u) => u.username === username)) {
      await db.insert(adminUsers).values({ username, passwordHash });
    }
    console.log(`[seed-admin] Reset password on ${all.length} user(s); ensured "${username}" exists`);
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
    console.error(`[seed-admin] CRITICAL: could not verify password for "${username}"`);
    await sql.end();
    process.exit(1);
  }

  console.log(`[seed-admin] OK — "${username}" can authenticate with current ADMIN_PASSWORD`);
  await sql.end();
}

main().catch((error) => {
  console.error("[seed-admin] Failed:", error);
  process.exit(1);
});
