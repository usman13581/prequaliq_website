import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { careerApplications } from "@/db/schema";

const LOCALE_VALUES = new Set(["en", "sv"]);
const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function trim(value: FormDataEntryValue | null, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const name = trim(formData.get("name"), 255);
  const email = trim(formData.get("email"), 255);
  const phone = trim(formData.get("phone"), 50) || null;
  const linkedIn = trim(formData.get("linkedIn"), 500) || null;
  const message = trim(formData.get("message"), 5000) || null;
  const locale = trim(formData.get("locale"), 5) || "en";
  const cv = formData.get("cv");

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!LOCALE_VALUES.has(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  if (!(cv instanceof File) || cv.size === 0) {
    return NextResponse.json({ error: "CV file is required" }, { status: 400 });
  }

  if (cv.size > MAX_CV_BYTES) {
    return NextResponse.json({ error: "CV file must be 5 MB or smaller" }, { status: 400 });
  }

  if (!ALLOWED_MIME.has(cv.type)) {
    return NextResponse.json(
      { error: "CV must be a PDF or Word document (.pdf, .doc, .docx)" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await cv.arrayBuffer());
  const cvData = buffer.toString("base64");
  const cvFileName = cv.name.slice(0, 255) || "cv.pdf";

  try {
    const db = getDb();

    const [row] = await db
      .insert(careerApplications)
      .values({
        name,
        email,
        phone,
        linkedIn,
        message,
        cvFileName,
        cvMimeType: cv.type,
        cvData,
        locale,
      })
      .returning({ id: careerApplications.id });

    return NextResponse.json({ success: true, id: row.id });
  } catch (error) {
    console.error("Career application failed:", error);
    const errMessage = error instanceof Error ? error.message : "";
    if (process.env.NODE_ENV === "development" && errMessage.includes("DATABASE_URL")) {
      return NextResponse.json(
        {
          error:
            "Database not configured locally. Add DATABASE_URL to .env and run npm run db:migrate.",
        },
        { status: 503 },
      );
    }
    if (errMessage.includes("career_applications")) {
      return NextResponse.json(
        { error: "Database migration required. Run npm run db:migrate." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
