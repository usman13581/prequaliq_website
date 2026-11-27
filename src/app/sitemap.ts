import type { MetadataRoute } from "next";

/** Public pages for search engines. The address can be set with NEXT_PUBLIC_SITE_URL. */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://prequaliq.com").replace(/\/$/, "");

const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/platform", priority: 0.9 },
  { path: "/buyers", priority: 0.9 },
  { path: "/suppliers", priority: 0.9 },
  { path: "/about", priority: 0.6 },
  { path: "/blog", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/careers", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
