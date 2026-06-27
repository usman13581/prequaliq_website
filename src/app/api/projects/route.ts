import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { projectSubmissions } from "@/db/schema";
import { sendEmail } from "@/lib/email";
import { buildProjectConfirmationEmail } from "@/lib/email-templates";
import { validateMeetingSlot } from "@/lib/meeting";

const PROJECT_TYPE_VALUES = new Set([
  "web-mobile",
  "enterprise",
  "integration",
  "erp",
  "consulting",
  "other",
]);

const TIMELINE_VALUES = new Set(["asap", "1-3-months", "3-6-months", "6-plus-months", "flexible", ""]);
const BUDGET_VALUES = new Set([
  "under-50k",
  "50-150k",
  "150-500k",
  "500k-plus",
  "not-sure",
  "",
]);

const LOCALE_VALUES = new Set(["en", "sv"]);

type ProjectPayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  timeline?: string;
  budget?: string;
  description?: string;
  scheduleMeeting?: boolean;
  meetingDate?: string;
  meetingTime?: string;
  locale?: string;
};

function trim(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: ProjectPayload;

  try {
    body = (await request.json()) as ProjectPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = trim(body.name, 255);
  const email = trim(body.email, 255);
  const company = trim(body.company, 255) || null;
  const projectType = trim(body.projectType, 100);
  const timeline = trim(body.timeline, 100) || null;
  const budget = trim(body.budget, 100) || null;
  const description = trim(body.description, 5000);
  const locale = trim(body.locale, 5) || "en";
  const scheduleMeeting = body.scheduleMeeting === true;
  const meetingDate = scheduleMeeting ? trim(body.meetingDate, 10) || null : null;
  const meetingTime = scheduleMeeting ? trim(body.meetingTime, 5) || null : null;

  if (!name || !email || !description || !projectType) {
    return NextResponse.json(
      { error: "Name, email, project type, and description are required" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!PROJECT_TYPE_VALUES.has(projectType)) {
    return NextResponse.json({ error: "Invalid project type" }, { status: 400 });
  }

  if (timeline && !TIMELINE_VALUES.has(timeline)) {
    return NextResponse.json({ error: "Invalid timeline" }, { status: 400 });
  }

  if (budget && !BUDGET_VALUES.has(budget)) {
    return NextResponse.json({ error: "Invalid budget range" }, { status: 400 });
  }

  if (!LOCALE_VALUES.has(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const meetingError = scheduleMeeting
    ? validateMeetingSlot(meetingDate, meetingTime)
    : validateMeetingSlot(null, null);

  if (meetingError) {
    return NextResponse.json({ error: meetingError }, { status: 400 });
  }

  try {
    const db = getDb();

    const [row] = await db
      .insert(projectSubmissions)
      .values({
        name,
        email,
        company,
        projectType,
        timeline,
        budget,
        description,
        meetingDate,
        meetingTime,
        locale,
      })
      .returning({ id: projectSubmissions.id });

    const mail = buildProjectConfirmationEmail(
      name,
      locale as "en" | "sv",
      meetingDate,
      meetingTime,
    );
    const emailResult = await sendEmail({ to: email, ...mail });
    if (!emailResult.sent) {
      console.error("[projects] Confirmation email failed:", emailResult.error);
    }

    return NextResponse.json({ success: true, id: row.id, emailSent: emailResult.sent });
  } catch (error) {
    console.error("Project submission failed:", error);
    const message = error instanceof Error ? error.message : "";
    if (process.env.NODE_ENV === "development" && message.includes("DATABASE_URL")) {
      return NextResponse.json(
        {
          error:
            "Database not configured locally. Add DATABASE_URL to .env and run npm run db:migrate.",
        },
        { status: 503 },
      );
    }
    if (message.includes("project_submissions")) {
      return NextResponse.json(
        { error: "Database migration required. Run npm run db:migrate." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Failed to submit project request" }, { status: 500 });
  }
}
