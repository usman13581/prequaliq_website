import { NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";
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

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await context.params;
  const db = getDb();

  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const images = await db
    .select()
    .from(blogImages)
    .where(eq(blogImages.postId, id))
    .orderBy(asc(blogImages.sortOrder));

  return NextResponse.json({
    post,
    images: images.map((img) => ({
      id: img.id,
      url: blogMediaUrl(img.id),
      fileName: img.fileName,
    })),
  });
}

export async function PUT(request: Request, context: RouteContext) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await context.params;
  const body = await readJsonBody<BlogBody>(request);
  if (!body?.title?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const db = getDb();
  const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const status = body.status === "published" ? "published" : "draft";
  const title = body.title.trim().slice(0, 500);
  let slug = (body.slug?.trim() || slugify(title)).slice(0, 200);
  const content = sanitizeBlogHtml(body.content.trim());
  const excerpt = (body.excerpt?.trim() || excerptFromHtml(content)).slice(0, 500);

  if (slug !== existing.slug) {
    const clash = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (clash.length > 0 && clash[0]!.id !== id) {
      slug = `${slug}-${Date.now().toString(36)}`.slice(0, 200);
    }
  }

  const publishedAt =
    status === "published"
      ? existing.publishedAt ?? new Date()
      : null;

  const [post] = await db
    .update(blogPosts)
    .set({
      title,
      slug,
      excerpt,
      content,
      status,
      coverImageId: body.coverImageId || null,
      publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id))
    .returning();

  if (body.imageIds) {
    await db.update(blogImages).set({ postId: null }).where(eq(blogImages.postId, id));
    for (let i = 0; i < body.imageIds.length; i++) {
      await db
        .update(blogImages)
        .set({ postId: id, sortOrder: i })
        .where(eq(blogImages.id, body.imageIds[i]!));
    }
  }

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const { id } = await context.params;
  const db = getDb();
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  return NextResponse.json({ success: true });
}
