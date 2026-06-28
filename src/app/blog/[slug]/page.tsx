import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { getPublishedPosts, getPublishedPostBySlug } from "@/lib/blog-queries";
import { prepareBlogContentForDisplay, blogMediaUrl } from "@/lib/blog";
import {
  addHeadingIds,
  pickRelatedPosts,
  readingTimeMinutes,
  serviceLabelFromBlogSlug,
  stripHtml,
  yearFromBlogSlug,
} from "@/lib/blog-utils";
import { BlogPostSidebar } from "@/components/blog/BlogPostSidebar";
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
  const page = t.blog.page;
  const { post, coverUrl } = data;

  const stripped = prepareBlogContentForDisplay(post.content, Boolean(coverUrl));
  const { html: contentHtml, headings } = addHeadingIds(stripped);
  const minutes = readingTimeMinutes(stripHtml(contentHtml));
  const serviceLabel = serviceLabelFromBlogSlug(post.slug);
  const year = yearFromBlogSlug(post.slug);

  const allRows = await getPublishedPosts();
  const related = pickRelatedPosts(allRows, post.slug, 5).map((p) => ({
    slug: p.slug,
    title: p.title,
    coverUrl: p.coverImageId ? blogMediaUrl(p.coverImageId) : null,
    publishedAt: p.publishedAt?.toISOString() ?? null,
  }));

  const relatedTitle = year
    ? page.relatedFromYear.replace("{year}", String(year))
    : page.relatedArticles;

  return (
    <article className="pb-20">
      <div className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
            ← {page.breadcrumb}
          </Link>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {serviceLabel && (
              <span className="inline-flex rounded-full bg-accent-subtle px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
                {serviceLabel}
              </span>
            )}
            {post.publishedAt && (
              <time className="text-xs uppercase tracking-wider text-muted">
                {post.publishedAt.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {page.readTime.replace("{min}", String(minutes))}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 leading-tight max-w-3xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-muted mt-4 leading-relaxed max-w-3xl">{post.excerpt}</p>
          )}
        </div>
      </div>

      {coverUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-lg">
            <Image src={coverUrl} alt="" fill className="object-cover" priority unoptimized />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10 xl:gap-14">
          <div
            className="blog-content min-w-0 text-foreground leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-xl [&_img]:my-6 [&_a]:text-accent [&_a]:underline [&_figure]:my-8 [&_figcaption]:text-sm [&_figcaption]:text-muted [&_figcaption]:text-center [&_figcaption]:mt-2 max-w-3xl"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="lg:sticky lg:top-24 lg:self-start h-fit">
            <BlogPostSidebar
              headings={headings}
              relatedPosts={related}
              onThisPageLabel={page.onThisPage}
              relatedTitle={relatedTitle}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
