"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { useTranslations } from "@/i18n/LanguageProvider";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  coverUrl: string | null;
};

const inputClass =
  "h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30";

function postYear(post: PublicBlogPost): number | null {
  if (!post.publishedAt) return null;
  const year = new Date(post.publishedAt).getFullYear();
  return Number.isNaN(year) ? null : year;
}

function formatCount(template: string, visible: number, total: number) {
  return template.replace("{visible}", String(visible)).replace("{total}", String(total));
}

function formatReadTime(template: string, minutes: number) {
  return template.replace("{min}", String(minutes));
}

export function BlogPageContent({ posts }: { posts: PublicBlogPost[] }) {
  const t = useTranslations();
  const page = t.blog.page;
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const years = useMemo(() => {
    const set = new Set<number>();
    for (const post of posts) {
      const year = postYear(post);
      if (year) set.add(year);
    }
    return Array.from(set).sort((a, b) => b - a);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      if (yearFilter !== "all") {
        const year = postYear(post);
        if (year === null || String(year) !== yearFilter) return false;
      }

      if (!query) return true;

      const haystack = [post.title, post.excerpt ?? "", post.slug.replace(/-/g, " ")]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [posts, search, yearFilter]);

  const hasFilters = search.trim().length > 0 || yearFilter !== "all";
  const featuredPost = filteredPosts[0] ?? null;
  const gridPosts = featuredPost ? filteredPosts.slice(1) : [];

  const readTimeLabel = (minutes: number) => formatReadTime(page.readTime, minutes);

  return (
    <>
      <PageHero
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: page.breadcrumb }]}
        homeLabel={t.nav.home}
      />

      <section className="py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-foreground mb-3">{page.emptyTitle}</h2>
              <p className="text-muted leading-relaxed max-w-xl mx-auto">{page.emptyDescription}</p>
            </div>
          ) : (
            <>
              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={page.searchPlaceholder}
                  className={`${inputClass} pl-9`}
                  aria-label={page.searchPlaceholder}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-8">
                <button
                  type="button"
                  onClick={() => setYearFilter("all")}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    yearFilter === "all"
                      ? "bg-primary text-white"
                      : "bg-surface border border-border text-muted hover:text-foreground"
                  }`}
                >
                  {page.allYears}
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setYearFilter(String(year))}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      yearFilter === String(year)
                        ? "bg-primary text-white"
                        : "bg-surface border border-border text-muted hover:text-foreground"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              <p className="text-xs text-muted mb-6">
                {formatCount(page.showingCount, filteredPosts.length, posts.length)}
              </p>

              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                  <h2 className="text-lg font-semibold text-foreground mb-2">{page.noResultsTitle}</h2>
                  <p className="text-sm text-muted mb-4">{page.noResultsDescription}</p>
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setYearFilter("all");
                      }}
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {page.clearFilters}
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-10">
                  {featuredPost && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
                        {hasFilters ? page.topResult : page.featuredLabel}
                      </p>
                      <BlogPostCard
                        post={featuredPost}
                        readMoreLabel={t.common.readMore}
                        readTimeLabel={readTimeLabel}
                        variant="featured"
                      />
                    </div>
                  )}

                  {gridPosts.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-4">
                        {page.allArticles}
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {gridPosts.map((post) => (
                          <li key={post.id}>
                            <BlogPostCard
                              post={post}
                              readMoreLabel={t.common.readMore}
                              readTimeLabel={readTimeLabel}
                              variant="compact"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
