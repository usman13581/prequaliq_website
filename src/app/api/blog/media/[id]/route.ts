import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { blogImages } from "@/db/schema";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const db = getDb();

  const [image] = await db.select().from(blogImages).where(eq(blogImages.id, id)).limit(1);
  if (!image) return new NextResponse("Not found", { status: 404 });

  const buffer = Buffer.from(image.data, "base64");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": image.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
