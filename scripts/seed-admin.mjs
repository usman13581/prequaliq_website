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

function wantsPasswordUpdate() {
  const raw = (process.env.ADMIN_UPDATE_PASSWORD ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const username = (process.env.ADMIN_USERNAME ?? "admin").trim();
  const password = (process.env.ADMIN_PASSWORD ?? "").trim();

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
  const shouldUpdate = wantsPasswordUpdate();
  const passwordHash = hashPassword(password);

  const existing = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);

  if (existing.length > 0) {
    if (shouldUpdate) {
      await db
        .update(adminUsers)
        .set({ passwordHash })
        .where(eq(adminUsers.username, username));
      console.log(`[seed-admin] Updated password for "${username}"`);
    } else {
      console.log(`[seed-admin] Admin user "${username}" already exists — skipping`);
    }
  } else {
    await db.insert(adminUsers).values({
      username,
      passwordHash,
    });
    console.log(`[seed-admin] Created admin user "${username}"`);
  }

  if (shouldUpdate || existing.length === 0) {
    const [check] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username))
      .limit(1);
    if (!check || !verifyPassword(password, check.passwordHash)) {
      console.error(`[seed-admin] CRITICAL: password verify failed for "${username}"`);
      await sql.end();
      process.exit(1);
    }
    console.log(`[seed-admin] Verified credentials for "${username}"`);
  }

  await sql.end();
}

main().catch((error) => {
  console.error("[seed-admin] Failed:", error);
  process.exit(1);
});
