"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  updatedAt: string;
  publishedAt: string | null;
};

type StatusFilter = "all" | "published" | "draft";

const inputClass =
  "h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30";

const selectClass =
  "h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30";

function postYear(post: PostRow): number | null {
  const date = post.publishedAt ?? post.updatedAt;
  if (!date) return null;
  const year = new Date(date).getFullYear();
  return Number.isNaN(year) ? null : year;
}

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((r) => r.json())
      .then((data: { posts: PostRow[] }) => setPosts(data.posts ?? []))
      .finally(() => setLoading(false));
  }, []);

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
      if (statusFilter !== "all" && post.status !== statusFilter) return false;

      if (yearFilter !== "all") {
        const year = postYear(post);
        if (year === null || String(year) !== yearFilter) return false;
      }

      if (!query) return true;

      return (
        post.title.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query)
      );
    });
  }, [posts, search, statusFilter, yearFilter]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blogs</h1>
          <p className="text-sm text-muted mt-1">Create and publish articles for the public blog.</p>
        </div>
        <Button href="/admin/blogs/new" size="sm" icon>
          <Plus className="w-4 h-4" />
          New post
        </Button>
      </div>

      {!loading && posts.length > 0 && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or slug…"
              className={`${inputClass} pl-9`}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className={selectClass}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className={selectClass}
            aria-label="Filter by year"
          >
            <option value="all">All years</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-muted mb-4">No blog posts yet.</p>
          <Button href="/admin/blogs/new" size="sm">
            Write your first post
          </Button>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-muted mb-2">No posts match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setYearFilter("all");
            }}
            className="text-sm font-medium text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted mb-3">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            <ul className="divide-y divide-border">
              {filteredPosts.map((post) => (
                <li key={post.id} className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-surface/50">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{post.title}</p>
                    <p className="text-xs text-muted mt-0.5">
                      /blog/{post.slug} ·{" "}
                      <span className={post.status === "published" ? "text-accent" : ""}>{post.status}</span>
                      {post.publishedAt && (
                        <>
                          {" "}
                          ·{" "}
                          {new Date(post.publishedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {post.status === "published" && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted hover:text-foreground"
                        title="View live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/blogs/${post.id}/edit`}
                      className="h-9 px-3 flex items-center gap-1.5 rounded-lg border border-border text-sm font-medium hover:bg-surface"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
