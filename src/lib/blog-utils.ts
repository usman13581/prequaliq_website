import { slugify } from "@/lib/blog";
import type { Locale } from "@/i18n/config";

const SERVICE_LABELS_EN: Record<string, string> = {
  "web-and-mobile": "Web & Mobile",
  "custom-software": "Custom Software",
  "ui-ux": "UI/UX Design",
  "cloud-solutions": "Cloud",
  "system-integration": "Integration",
  "legacy-modernization": "Legacy Modernisation",
  "ai-solutions": "AI Solutions",
  "data-analytics": "Data & Analytics",
  "dedicated-teams": "Dedicated Teams",
  "it-consulting": "IT Consulting",
  "maintenance-support": "Maintenance",
};

const SERVICE_LABELS_SV: Record<string, string> = {
  "web-and-mobile": "Webb & mobil",
  "custom-software": "Skräddarsydd mjukvara",
  "ui-ux": "UI/UX-design",
  "cloud-solutions": "Moln",
  "system-integration": "Integration",
  "legacy-modernization": "Modernisering av legacy",
  "ai-solutions": "AI-lösningar",
  "data-analytics": "Data & analys",
  "dedicated-teams": "Dedikerade team",
  "it-consulting": "IT-rådgivning",
  "maintenance-support": "Underhåll",
};

export type BlogHeading = { id: string; text: string };

export function serviceKeyFromBlogSlug(slug: string): string | null {
  if (slug.includes("web-and-mobile")) return "web-and-mobile";
  if (slug.includes("custom-software")) return "custom-software";
  if (slug.includes("ui-ux")) return "ui-ux";
  if (slug.includes("cloud-solutions")) return "cloud-solutions";
  if (slug.includes("system-integration")) return "system-integration";
  if (slug.includes("legacy-modernization")) return "legacy-modernization";
  if (slug.includes("ai-solutions")) return "ai-solutions";
  if (slug.includes("data-analytics")) return "data-analytics";
  if (slug.includes("dedicated-teams")) return "dedicated-teams";
  if (slug.includes("it-consulting")) return "it-consulting";
  if (slug.includes("maintenance-support")) return "maintenance-support";
  return null;
}

export function serviceLabelFromBlogSlug(slug: string, locale: Locale = "en"): string | null {
  const key = serviceKeyFromBlogSlug(slug);
  if (!key) return null;
  const labels = locale === "sv" ? SERVICE_LABELS_SV : SERVICE_LABELS_EN;
  return labels[key] ?? null;
}

export function formatBlogDate(
  value: string | Date | null | undefined,
  locale: Locale,
  style: "short" | "long" = "short",
): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(locale === "sv" ? "sv-SE" : "en-GB", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });
}

export function yearFromBlogSlug(slug: string): number | null {
  const year = Number.parseInt(slug.slice(0, 4), 10);
  return Number.isNaN(year) ? null : year;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function readingTimeMinutes(text: string, wordsPerMinute = 200): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function addHeadingIds(html: string): { html: string; headings: BlogHeading[] } {
  const headings: BlogHeading[] = [];
  const used = new Set<string>();
  let fallback = 0;

  const output = html.replace(/<h2(\b[^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs: string, inner: string) => {
    const text = stripHtml(inner);
    if (!text) return _match;

    let id = slugify(text);
    if (!id || used.has(id)) {
      id = `section-${fallback++}`;
    }
    used.add(id);
    headings.push({ id, text });

    const attrsClean = attrs.replace(/\sid="[^"]*"/i, "");
    return `<h2${attrsClean} id="${id}">${inner}</h2>`;
  });

  return { html: output, headings };
}

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: Date | null;
  coverImageId: string | null;
};

export function pickRelatedPosts(
  all: BlogPostSummary[],
  currentSlug: string,
  limit = 5,
): BlogPostSummary[] {
  const currentYear = yearFromBlogSlug(currentSlug);
  const currentService = serviceKeyFromBlogSlug(currentSlug);

  return all
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      let score = 0;
      const year = yearFromBlogSlug(post.slug);
      const service = serviceKeyFromBlogSlug(post.slug);
      if (currentYear && year === currentYear) score += 3;
      if (currentService && service === currentService) score += 2;
      return { post, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const aTime = a.post.publishedAt?.getTime() ?? 0;
      const bTime = b.post.publishedAt?.getTime() ?? 0;
      return bTime - aTime;
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
