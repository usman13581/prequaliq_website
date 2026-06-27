import { desc, eq, asc } from "drizzle-orm";
import { getDb } from "@/db";
import { blogPosts, blogImages } from "@/db/schema";
import { blogMediaUrl } from "@/lib/blog";

export async function getPublishedPosts() {
  const db = getDb();
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getPublishedPostBySlug(slug: string) {
  const db = getDb();
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post || post.status !== "published") return null;

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
