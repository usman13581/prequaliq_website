import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";

const SUBJECT_VALUES = new Set([
  "general",
  "app-development",
  "cloud-integration",
  "ai-automation",
  "partnership",
  "products",
]);

const SOURCE_VALUES = new Set(["contact_page", "get_started_modal"]);
const LOCALE_VALUES = new Set(["en", "sv"]);

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
  source?: string;
  locale?: string;
};

function trim(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = trim(body.name, 255);
  const email = trim(body.email, 255);
  const company = trim(body.company, 255) || null;
  const message = trim(body.message, 5000);
  const subject = trim(body.subject, 100) || "general";
  const source = trim(body.source, 50) || "contact_page";
  const locale = trim(body.locale, 5) || "en";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!SUBJECT_VALUES.has(subject)) {
    return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
  }

  if (!SOURCE_VALUES.has(source)) {
    return NextResponse.json({ error: "Invalid source" }, { status: 400 });
  }

  if (!LOCALE_VALUES.has(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  try {
    const db = getDb();

    const [row] = await db
      .insert(contactSubmissions)
      .values({
        name,
        email,
        company,
        subject,
        message,
        source,
        locale,
      })
      .returning({ id: contactSubmissions.id });

    return NextResponse.json({ success: true, id: row.id });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
