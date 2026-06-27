import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  authenticateAdmin,
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth";

type LoginBody = { username?: string; password?: string };

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  try {
    const user = await authenticateAdmin(username, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const token = await createSessionToken(user.id, user.username);
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, sessionCookieOptions());

    return NextResponse.json({ success: true, username: user.username });
  } catch (error) {
    console.error("[admin/login]", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("ADMIN_SESSION_SECRET")) {
      return NextResponse.json({ error: "Admin session secret is not configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
