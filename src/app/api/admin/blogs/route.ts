import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { blogPosts, blogImages } from "@/db/schema";
import { requireAdminSession, readJsonBody } from "@/lib/admin-api";
import { excerptFromHtml, sanitizeBlogHtml, slugify, blogMediaUrl } from "@/lib/blog";

type BlogBody = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  status?: string;
  coverImageId?: string | null;
  imageIds?: string[];
};

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  const db = getDb();
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));

  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const { session, error } = await requireAdminSession();
  if (error) return error;

  const body = await readJsonBody<BlogBody>(request);
  if (!body?.title?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const status = body.status === "published" ? "published" : "draft";
  const title = body.title.trim().slice(0, 500);
  let slug = (body.slug?.trim() || slugify(title)).slice(0, 200);
  const content = sanitizeBlogHtml(body.content.trim());
  const excerpt = (body.excerpt?.trim() || excerptFromHtml(content)).slice(0, 500);

  const db = getDb();

  const existing = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (existing.length > 0) {
    slug = `${slug}-${Date.now().toString(36)}`.slice(0, 200);
  }

  const [post] = await db
    .insert(blogPosts)
    .values({
      title,
      slug,
      excerpt,
      content,
      status,
      coverImageId: body.coverImageId || null,
      authorId: session!.userId,
      publishedAt: status === "published" ? new Date() : null,
      updatedAt: new Date(),
    })
    .returning();

  if (body.imageIds?.length) {
    for (let i = 0; i < body.imageIds.length; i++) {
      await db
        .update(blogImages)
        .set({ postId: post.id, sortOrder: i })
        .where(eq(blogImages.id, body.imageIds[i]!));
    }
  }

  return NextResponse.json({ post });
}
