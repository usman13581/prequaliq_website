import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/lib/blog-queries";
import { prepareBlogContentForDisplay } from "@/lib/blog";
import { getLocale } from "@/i18n/server";
import { getMessages } from "@/i18n";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPublishedPostBySlug(slug);
  if (!data) return { title: "Not found" };
  return { title: data.post.title, description: data.post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPublishedPostBySlug(slug);
  if (!data) notFound();

  const locale = await getLocale();
  const t = getMessages(locale);
  const { post, coverUrl } = data;
  const contentHtml = prepareBlogContentForDisplay(post.content, Boolean(coverUrl));

  return (
    <article className="pb-20">
      <div className="bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
            ← {t.blog.page.breadcrumb}
          </Link>
          {post.publishedAt && (
            <time className="block text-xs uppercase tracking-wider text-muted mt-4">
              {post.publishedAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 leading-tight">{post.title}</h1>
          {post.excerpt && <p className="text-lg text-muted mt-4 leading-relaxed">{post.excerpt}</p>}
        </div>
      </div>

      {coverUrl && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-lg">
            <Image src={coverUrl} alt="" fill className="object-cover" priority unoptimized />
          </div>
        </div>
      )}

      <div
        className="blog-content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-foreground leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-xl [&_img]:my-6 [&_a]:text-accent [&_a]:underline [&_figure]:my-8 [&_figcaption]:text-sm [&_figcaption]:text-muted [&_figcaption]:text-center [&_figcaption]:mt-2"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
