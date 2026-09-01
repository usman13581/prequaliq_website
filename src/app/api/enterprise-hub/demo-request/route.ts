import { NextResponse } from "next/server";
import { getMarbleApiUrl } from "@/lib/marble-api";

const SUCCESS_MESSAGE =
  "Your trial is being prepared. Login details will be sent to your email address.";
const GENERIC_ERROR = "We could not start your trial right now. Please try again shortly.";
const REQUEST_TIMEOUT_MS = 8_000;

type DemoRequestBody = Record<string, unknown>;

function trim(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeCountry(value: unknown): string {
  const country = trim(value, 2).toUpperCase();
  return /^[A-Z]{2}$/.test(country) ? country : "";
}

function errorResponse(status: number) {
  return NextResponse.json(
    { ok: false, message: GENERIC_ERROR },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  let body: DemoRequestBody;

  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return errorResponse(400);
    }
    body = parsed as DemoRequestBody;
  } catch {
    return errorResponse(400);
  }

  const companyName = trim(body.companyName, 255);
  const email = trim(body.email, 255).toLowerCase();
  const country = normalizeCountry(body.country);
  const honeypot = trim(body.honeypot, 100);

  if (!companyName || !email || !country || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return errorResponse(400);
  }

  const marbleApiUrl = getMarbleApiUrl();
  if (!marbleApiUrl) {
    return errorResponse(503);
  }

  const payload = {
    companyName,
    email,
    country,
    contactName: trim(body.contactName, 255),
    phone: trim(body.phone, 50),
    emirate: trim(body.emirate, 100),
    approxUsers: trim(body.approxUsers, 50),
    note: trim(body.note, 2_000),
    honeypot,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${marbleApiUrl}/public/demo-requests`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      const status = response.status >= 400 && response.status < 500 ? response.status : 502;
      return errorResponse(status);
    }

    return NextResponse.json(
      { ok: true, message: SUCCESS_MESSAGE },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return errorResponse(502);
  } finally {
    clearTimeout(timeout);
  }
}
