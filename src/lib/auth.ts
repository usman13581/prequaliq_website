import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { adminUsers } from "@/db/schema";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

/** TEMP bootstrap credentials — remove after confirmed login works. */
const BOOTSTRAP_USERNAME = "admin";
const BOOTSTRAP_PASSWORD = "Admin@123";

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 32 characters)");
  }
  return new TextEncoder().encode(secret);
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, "hex");
  const testBuffer = scryptSync(password, salt, 64);
  if (hashBuffer.length !== testBuffer.length) return false;
  return timingSafeEqual(hashBuffer, testBuffer);
}

export async function createSessionToken(userId: string, username: string): Promise<string> {
  return new SignJWT({ sub: userId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (typeof payload.sub !== "string" || typeof payload.username !== "string") return null;
    return { userId: payload.sub, username: payload.username };
  } catch {
    return null;
  }
}

export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function authenticateAdmin(username: string, password: string) {
  const u = username.trim();
  const p = password.trim();
  const db = getDb();

  // TEMP: accept hardcoded bootstrap even if DB hash is stale
  if (u === BOOTSTRAP_USERNAME && p === BOOTSTRAP_PASSWORD) {
    let [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, BOOTSTRAP_USERNAME))
      .limit(1);

    if (!user) {
      const [created] = await db
        .insert(adminUsers)
        .values({
          username: BOOTSTRAP_USERNAME,
          passwordHash: hashPassword(BOOTSTRAP_PASSWORD),
        })
        .returning();
      user = created;
    } else if (!verifyPassword(BOOTSTRAP_PASSWORD, user.passwordHash)) {
      await db
        .update(adminUsers)
        .set({ passwordHash: hashPassword(BOOTSTRAP_PASSWORD) })
        .where(eq(adminUsers.id, user.id));
    }

    if (!user) return null;
    return { id: user.id, username: user.username };
  }

  const [user] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, u))
    .limit(1);

  if (!user || !verifyPassword(p, user.passwordHash)) {
    return null;
  }

  return { id: user.id, username: user.username };
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
