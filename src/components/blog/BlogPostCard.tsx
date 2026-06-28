import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { serviceLabelFromBlogSlug, readingTimeMinutes } from "@/lib/blog-utils";
import type { PublicBlogPost } from "@/components/blog/BlogPageContent";

type BlogPostCardProps = {
  post: PublicBlogPost;
  readMoreLabel: string;
  readTimeLabel: (minutes: number) => string;
  variant?: "compact" | "featured";
};

export function BlogPostCard({ post, readMoreLabel, readTimeLabel, variant = "compact" }: BlogPostCardProps) {
  const serviceLabel = serviceLabelFromBlogSlug(post.slug);
  const minutes = readingTimeMinutes([post.title, post.excerpt ?? ""].join(" "));
  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-shadow">
        <div className="grid md:grid-cols-2">
          {post.coverUrl && (
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px] bg-surface">
              <Image src={post.coverUrl} alt="" fill className="object-cover" unoptimized priority />
            </div>
          )}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {serviceLabel && (
                <span className="inline-flex rounded-full bg-accent-subtle px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
                  {serviceLabel}
                </span>
              )}
              {dateLabel && <time className="text-xs text-muted">{dateLabel}</time>}
              <span className="inline-flex items-center gap-1 text-xs text-muted">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {readTimeLabel(minutes)}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.excerpt && (
              <p className="text-muted leading-relaxed mt-3 line-clamp-3">{post.excerpt}</p>
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent mt-5 hover:gap-2 transition-all"
            >
              {readMoreLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex gap-4 rounded-xl border border-border bg-card p-3 sm:p-4 hover:border-accent/30 hover:shadow-md hover:shadow-primary/5 transition-all">
      {post.coverUrl && (
        <Link
          href={`/blog/${post.slug}`}
          className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface"
        >
          <Image src={post.coverUrl} alt="" fill className="object-cover" unoptimized />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
          {serviceLabel && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-accent">{serviceLabel}</span>
          )}
          {dateLabel && (
            <>
              {serviceLabel && <span className="text-muted/40">·</span>}
              <time className="text-[11px] text-muted">{dateLabel}</time>
            </>
          )}
          <span className="text-muted/40 hidden sm:inline">·</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-muted">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {readTimeLabel(minutes)}
          </span>
        </div>
        <h2 className="text-sm sm:text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        {post.excerpt && (
          <p className="text-xs sm:text-sm text-muted mt-1.5 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        )}
      </div>
    </article>
  );
}
