import { and, desc, eq, asc, lte, isNotNull } from "drizzle-orm";
import { getDb } from "@/db";
import { blogPosts, blogImages } from "@/db/schema";
import { blogMediaUrl } from "@/lib/blog";

/** Public visibility: published and publish date has been reached. */
function isPubliclyVisible(status: string, publishedAt: Date | null, now = new Date()) {
  return status === "published" && publishedAt != null && publishedAt.getTime() <= now.getTime();
}

export async function getPublishedPosts() {
  const db = getDb();
  const now = new Date();
  return db
    .select()
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.status, "published"),
        isNotNull(blogPosts.publishedAt),
        lte(blogPosts.publishedAt, now),
      ),
    )
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getPublishedPostBySlug(slug: string) {
  const db = getDb();
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post || !isPubliclyVisible(post.status, post.publishedAt)) return null;

  const images = await db
    .select()
    .from(blogImages)
    .where(eq(blogImages.postId, post.id))
    .orderBy(asc(blogImages.sortOrder));

  return {
    post,
    images: images.map((img) => ({
      id: img.id,
      url: blogMediaUrl(img.id),
      fileName: img.fileName,
    })),
    coverUrl: post.coverImageId ? blogMediaUrl(post.coverImageId) : null,
  };
}
