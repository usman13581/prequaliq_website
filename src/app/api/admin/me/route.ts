import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-api";

export async function GET() {
  const { session, error } = await requireAdminSession();
  if (error) return error;
  return NextResponse.json({ username: session!.username });
}
