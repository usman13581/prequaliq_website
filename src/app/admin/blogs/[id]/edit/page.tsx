import { notFound } from "next/navigation";
import { eq, asc } from "drizzle-orm";
import { getDb } from "@/db";
import { blogPosts, blogImages } from "@/db/schema";
import { blogMediaUrl } from "@/lib/blog";
import { BlogEditor } from "@/components/admin/BlogEditor";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: PageProps) {
  const { id } = await params;
  const db = getDb();

  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  if (!post) notFound();

  const images = await db
    .select()
    .from(blogImages)
    .where(eq(blogImages.postId, id))
    .orderBy(asc(blogImages.sortOrder));

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Edit blog post</h1>
      <BlogEditor
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          status: post.status as "draft" | "published",
          coverImageId: post.coverImageId,
          images: images.map((img) => ({
            id: img.id,
            url: blogMediaUrl(img.id),
            fileName: img.fileName,
          })),
        }}
      />
    </div>
  );
}
