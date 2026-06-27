import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { blogImages } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";
import { blogMediaUrl } from "@/lib/blog";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const { error } = await requireAdminSession();
  if (error) return error;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  const postId = typeof formData.get("postId") === "string" ? formData.get("postId") as string : null;

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Image file is required" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 4 MB or smaller" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Use JPEG, PNG, WebP, or GIF" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const data = buffer.toString("base64");

  try {
    const db = getDb();
    const [row] = await db
      .insert(blogImages)
      .values({
        postId: postId || null,
        fileName: file.name.slice(0, 255) || "image.jpg",
        mimeType: file.type,
        data,
      })
      .returning({ id: blogImages.id });

    return NextResponse.json({
      id: row.id,
      url: blogMediaUrl(row.id),
      fileName: file.name,
    });
  } catch (err) {
    console.error("[admin/upload]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Image id required" }, { status: 400 });

  const db = getDb();
  await db.delete(blogImages).where(eq(blogImages.id, id));
  return NextResponse.json({ success: true });
}
