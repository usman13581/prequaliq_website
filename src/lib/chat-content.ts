import { createHash } from "node:crypto";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { expertiseSlugs } from "@/lib/expertise-structure";
import { allServiceSlugs } from "@/i18n/service-structure";
import { siteConfig } from "@/lib/site-data";

export type ChatContentDocument = {
  sourceType: string;
  sourceKey: string;
  locale: Locale;
  title: string;
  urlPath: string;
  metadata: Record<string, unknown>;
  body: string;
};

function hashContent(body: string): string {
  return createHash("sha256").update(body).digest("hex");
}

export function contentHashForBody(body: string): string {
  return hashContent(body);
}

/** Flatten nested i18n objects into readable plain text. */
export function flattenToText(value: unknown, depth = 0): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    return value
      .map((item) => flattenToText(item, depth + 1))
      .filter(Boolean)
      .join("\n");
  }

  if (typeof value === "object") {
    const lines: string[] = [];
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (key === "metadata" || key === "image" || key === "imageAlt" || key === "href") continue;
      const text = flattenToText(child, depth + 1);
      if (!text) continue;
      if (depth === 0 && typeof child === "object" && child !== null && !Array.isArray(child)) {
        lines.push(`## ${key}\n${text}`);
      } else {
        lines.push(text);
      }
    }
    return lines.join("\n\n");
  }

  return "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<\/(p|div|h[1-6]|li|br|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function doc(
  partial: Omit<ChatContentDocument, "body"> & { body: string },
): ChatContentDocument {
  return { ...partial, body: partial.body.trim() };
}

/** Collect all indexable site documents for a locale (excludes blogs — loaded from DB). */
export function collectSiteDocuments(locale: Locale): ChatContentDocument[] {
  const m = getMessages(locale);
  const docs: ChatContentDocument[] = [];

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "site-overview",
      locale,
      title: m.site.name,
      urlPath: "/",
      metadata: { tagline: m.site.tagline, email: siteConfig.email, phones: siteConfig.phones, address: siteConfig.address },
      body: [
        `Company: ${m.site.name}`,
        `Tagline: ${m.site.tagline}`,
        `Description: ${m.site.description}`,
        `Email: ${siteConfig.email}`,
        `Phone: ${siteConfig.phones.join(", ")}`,
        `Address: ${siteConfig.address}`,
        `Founded: ${siteConfig.foundedYear} in ${siteConfig.foundedIn}`,
        flattenToText(m.home.whoWeAre),
        flattenToText(m.home.whatWeOffer),
        flattenToText(m.home.serviceModels),
        flattenToText(m.home.values),
      ].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "contact",
      locale,
      title: m.contact?.page?.title ?? "Contact",
      urlPath: "/contact",
      metadata: { type: "contact" },
      body: flattenToText(m.contact),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "team",
      locale,
      title: m.team.intro.title,
      urlPath: "/team",
      metadata: { memberCount: m.team.members.length },
      body: [
        flattenToText(m.team.intro),
        "Team members:",
        ...m.team.members.map((member) => `- ${member.name}: ${member.role}`),
      ].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "services-overview",
      locale,
      title: m.services.page.hero.title,
      urlPath: "/services",
      metadata: { type: "services_index" },
      body: [m.services.page.hero.description, flattenToText(m.services.categories)].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "products-overview",
      locale,
      title: m.products.page.title,
      urlPath: "/products",
      metadata: { type: "products_index" },
      body: [m.products.page.heroTitle, m.products.page.heroDescription].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "expertise-overview",
      locale,
      title: m.expertise.page.title,
      urlPath: "/expertise",
      metadata: { type: "expertise_index" },
      body: m.expertise.page.description,
    }),
  );

  for (const slug of allServiceSlugs) {
    const item = m.services.items[slug as keyof typeof m.services.items];
    if (!item) continue;
    docs.push(
      doc({
        sourceType: "service",
        sourceKey: slug,
        locale,
        title: item.title,
        urlPath: `/services/${slug}`,
        metadata: { category: item.category, slug },
        body: [
          item.title,
          item.shortDescription,
          item.description,
          "Features:",
          ...(item.features ?? []).map((f) => `- ${f}`),
        ].join("\n\n"),
      }),
    );
  }

  const productKeys = ["prequaliqApps", "enterpriseHub"] as const;
  for (const key of productKeys) {
    const product = m.products[key];
    const slug = key === "prequaliqApps" ? "prequaliq-apps" : "enterprise-hub";
    docs.push(
      doc({
        sourceType: "product",
        sourceKey: slug,
        locale,
        title: product.title,
        urlPath: `/products/${slug}`,
        metadata: { slug, productKey: key },
        body: flattenToText(product),
      }),
    );
  }

  for (const slug of expertiseSlugs) {
    const item = m.expertise.items[slug];
    if (!item) continue;
    docs.push(
      doc({
        sourceType: "expertise",
        sourceKey: slug,
        locale,
        title: item.title,
        urlPath: `/expertise/${slug}`,
        metadata: { slug },
        body: flattenToText(item),
      }),
    );
  }

  if (m.legal?.privacy) {
    docs.push(
      doc({
        sourceType: "legal",
        sourceKey: "privacy",
        locale,
        title: m.legal.privacy.title ?? "Privacy Policy",
        urlPath: "/legal/privacy",
        metadata: { type: "legal" },
        body: flattenToText(m.legal.privacy),
      }),
    );
  }

  if (m.legal?.terms) {
    docs.push(
      doc({
        sourceType: "legal",
        sourceKey: "terms",
        locale,
        title: m.legal.terms.title ?? "Terms & Conditions",
        urlPath: "/legal/terms",
        metadata: { type: "legal" },
        body: flattenToText(m.legal.terms),
      }),
    );
  }

  if (m.blog?.page) {
    docs.push(
      doc({
        sourceType: "company",
        sourceKey: "blog-overview",
        locale,
        title: m.blog.page.title ?? "Blog",
        urlPath: "/blog",
        metadata: { type: "blog_index" },
        body: [m.blog.page.title, m.blog.page.description].filter(Boolean).join("\n\n"),
      }),
    );
  }

  return docs;
}

export function blogDocumentFromRow(row: {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  publishedAt: Date | null;
}): ChatContentDocument {
  const plain = stripHtml(row.content);
  return doc({
    sourceType: "blog",
    sourceKey: row.slug,
    locale: "en",
    title: row.title,
    urlPath: `/blog/${row.slug}`,
    metadata: {
      slug: row.slug,
      publishedAt: row.publishedAt?.toISOString() ?? null,
    },
    body: [row.title, row.excerpt ?? "", plain].filter(Boolean).join("\n\n"),
  });
}

export { stripHtml };
