"use client";

import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { useTranslations } from "@/i18n/LanguageProvider";
import { ArrowRight } from "lucide-react";

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  coverUrl: string | null;
};

export function BlogPageContent({ posts }: { posts: PublicBlogPost[] }) {
  const t = useTranslations();
  const page = t.blog.page;

  return (
    <>
      <PageHero
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: page.breadcrumb }]}
        homeLabel={t.nav.home}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-foreground mb-3">{page.emptyTitle}</h2>
              <p className="text-muted leading-relaxed max-w-xl mx-auto">{page.emptyDescription}</p>
            </div>
          ) : (
            <ul className="space-y-8">
              {posts.map((post) => (
                <li key={post.id}>
                  <article className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-shadow">
                    {post.coverUrl && (
                      <div className="relative aspect-[21/9] bg-surface">
                        <Image src={post.coverUrl} alt="" fill className="object-cover" unoptimized />
                      </div>
                    )}
                    <div className="p-6 sm:p-8">
                      {post.publishedAt && (
                        <time className="text-xs font-medium uppercase tracking-wider text-accent">
                          {new Date(post.publishedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      )}
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                      )}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2 transition-all"
                      >
                        {t.common.readMore}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
