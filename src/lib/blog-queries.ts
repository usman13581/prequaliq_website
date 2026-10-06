import { and, desc, eq, asc, lte, isNotNull } from "drizzle-orm";
import { getDb } from "@/db";
import { blogPosts, blogImages } from "@/db/schema";
import { blogMediaUrl } from "@/lib/blog";
import type { Locale } from "@/i18n/config";

/** Public visibility: published and publish date has been reached. */
function isPubliclyVisible(status: string, publishedAt: Date | null, now = new Date()) {
  return status === "published" && publishedAt != null && publishedAt.getTime() <= now.getTime();
}

export type LocalizedBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImageId: string | null;
  status: string;
  publishedAt: Date | null;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
  titleSv: string | null;
  excerptSv: string | null;
  contentSv: string | null;
};

export function localizeBlogPost<T extends LocalizedBlogPost>(post: T, locale: Locale): T {
  if (locale !== "sv") return post;
  if (!post.titleSv || !post.contentSv) return post;
  return {
    ...post,
    title: post.titleSv,
    excerpt: post.excerptSv ?? post.excerpt,
    content: post.contentSv,
  };
}

export async function getPublishedPosts(locale: Locale = "en") {
  const db = getDb();
  const now = new Date();
  const rows = await db
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

  return rows.map((row) => localizeBlogPost(row, locale));
}

export async function getPublishedPostBySlug(slug: string, locale: Locale = "en") {
  const db = getDb();
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post || !isPubliclyVisible(post.status, post.publishedAt)) return null;

  const localized = localizeBlogPost(post, locale);

  const images = await db
    .select()
    .from(blogImages)
    .where(eq(blogImages.postId, post.id))
    .orderBy(asc(blogImages.sortOrder));

  return {
    post: localized,
    images: images.map((img) => ({
      id: img.id,
      url: blogMediaUrl(img.id),
      fileName: img.fileName,
    })),
    coverUrl: post.coverImageId ? blogMediaUrl(post.coverImageId) : null,
  };
}
