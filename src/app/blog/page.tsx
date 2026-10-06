import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { getPublishedPosts } from "@/lib/blog-queries";
import { blogMediaUrl } from "@/lib/blog";

/** Re-check publish windows at least hourly so scheduled posts go live without redeploy. */
export const revalidate = 3600;

export default async function BlogPage() {
  const rows = await getPublishedPosts();

  const posts = rows.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    coverUrl: post.coverImageId ? blogMediaUrl(post.coverImageId) : null,
  }));

  return <BlogPageContent posts={posts} />;
}
