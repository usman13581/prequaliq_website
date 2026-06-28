import Link from "next/link";
import Image from "next/image";
import { serviceLabelFromBlogSlug } from "@/lib/blog-utils";
import type { BlogHeading } from "@/lib/blog-utils";

export type SidebarPost = {
  slug: string;
  title: string;
  coverUrl: string | null;
  publishedAt: string | null;
};

type BlogPostSidebarProps = {
  headings: BlogHeading[];
  relatedPosts: SidebarPost[];
  onThisPageLabel: string;
  relatedTitle: string;
};

export function BlogPostSidebar({ headings, relatedPosts, onThisPageLabel, relatedTitle }: BlogPostSidebarProps) {
  return (
    <aside className="space-y-8">
      {headings.length > 0 && (
        <nav aria-label={onThisPageLabel} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">{onThisPageLabel}</p>
          <ul className="space-y-2">
            {headings.map(({ id, text }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block text-sm text-muted hover:text-accent leading-snug transition-colors line-clamp-2"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {relatedPosts.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">{relatedTitle}</p>
          <ul className="space-y-3">
            {relatedPosts.map((post) => {
              const serviceLabel = serviceLabelFromBlogSlug(post.slug);
              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex gap-3 group rounded-lg p-1.5 -mx-1.5 hover:bg-surface transition-colors"
                  >
                    {post.coverUrl && (
                      <div className="relative shrink-0 w-14 h-14 rounded-md overflow-hidden bg-surface">
                        <Image src={post.coverUrl} alt="" fill className="object-cover" unoptimized />
                      </div>
                    )}
                    <div className="min-w-0">
                      {serviceLabel && (
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-accent">
                          {serviceLabel}
                        </span>
                      )}
                      <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </aside>
  );
}
