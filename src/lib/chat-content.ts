import { createHash } from "node:crypto";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { getProductSite } from "@/i18n/product-site";
import { siteConfig } from "@/lib/site-data";
import { getCapabilityBridgeBody } from "@/lib/chat-advisory";

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

/** Engagement / process / pricing-inquiry / office-hours knowledge (not a price list). */
function buildEngagementBody(locale: Locale): string {
  const m = getMessages(locale);
  const proj = m.project?.form?.options;
  const timelines = proj?.timeline
    ? Object.values(proj.timeline).filter((v) => typeof v === "string")
    : [];
  const budgets = proj?.budget
    ? Object.values(proj.budget).filter((v) => typeof v === "string")
    : [];

  if (locale === "sv") {
    return [
      "Så kommer ni igång med Prequaliq e-upphandling:",
      "Upphandlare och leverantörer kontaktar oss för demo och onboarding via Kontaktsidan eller info@prequaliq.com.",
      "Plattformsinloggning: https://prequaliq.up.railway.app/login",
      "Leverantörsregistrering (gratis konto): https://prequaliq.up.railway.app/register",
      "Prequaliq täcker e-upphandling för svensk offentlig sektor: sök, kvalificering, DIS, AI-dokument, offentlig Q&A och livechatt efter tilldelning.",
      "Prissättning publiceras inte som fasta listpriser — kontakta sälj för en genomgång anpassad till er organisation.",
      timelines.length ? `I förfrågan kan tidslinjer anges: ${timelines.join(", ")}.` : "",
      budgets.length ? `Budgetspann i förfrågan: ${budgets.join(", ")}.` : "",
      `Kontakt: ${siteConfig.email}, ${siteConfig.phones.join(", ")}. Adress: ${siteConfig.address}.`,
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  return [
    "How to get started with Prequaliq e-procurement:",
    "Buyers and suppliers contact us for a demo and onboarding via the Contact page or info@prequaliq.com.",
    "Platform login: https://prequaliq.up.railway.app/login",
    "Supplier registration (free account): https://prequaliq.up.railway.app/register",
    "Prequaliq covers e-procurement for the Swedish public sector: search, qualification, DIS, AI documents, public Q&A, and live chat after award.",
    "Pricing is not published as fixed list prices — contact sales for a walkthrough tailored to your organisation.",
    timelines.length ? `Inquiry timelines may include: ${timelines.join(", ")}.` : "",
    budgets.length ? `Budget ranges on inquiry: ${budgets.join(", ")}.` : "",
    `Contact: ${siteConfig.email}, ${siteConfig.phones.join(", ")}. Address: ${siteConfig.address}.`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

/** Collect all indexable site documents for a locale (excludes blogs — loaded from DB). */
export function collectSiteDocuments(locale: Locale): ChatContentDocument[] {
  const m = getMessages(locale);
  const product = getProductSite(locale);
  const docs: ChatContentDocument[] = [];

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "site-overview",
      locale,
      title: product.brand.name,
      urlPath: "/",
      metadata: {
        tagline: product.brand.tagline,
        email: siteConfig.email,
        phones: siteConfig.phones,
        address: siteConfig.address,
      },
      body: [
        `Company: ${product.brand.name}`,
        `Product: ${product.brand.productName}`,
        `Tagline: ${product.brand.tagline}`,
        `Description: ${product.brand.description}`,
        `Email: ${siteConfig.email}`,
        `Phone: ${siteConfig.phones.join(", ")}`,
        `Address: ${siteConfig.address}`,
        `Founded: ${siteConfig.foundedYear} in ${siteConfig.foundedIn}`,
        `Platform login: https://prequaliq.up.railway.app/login`,
        flattenToText(product.hero),
        flattenToText(product.preferred),
        flattenToText(product.network),
        flattenToText(product.features),
        flattenToText(product.audiences),
        flattenToText(product.faq),
      ].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "product",
      sourceKey: "buyers",
      locale,
      title: product.buyersPage.title,
      urlPath: "/buyers",
      metadata: { audience: "buyers" },
      body: flattenToText(product.buyersPage),
    }),
  );

  docs.push(
    doc({
      sourceType: "product",
      sourceKey: "suppliers",
      locale,
      title: product.suppliersPage.title,
      urlPath: "/suppliers",
      metadata: { audience: "suppliers" },
      body: flattenToText(product.suppliersPage),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "about",
      locale,
      title: m.about?.page?.title ?? "About PrequaliQ",
      urlPath: "/about",
      metadata: { type: "about" },
      body: [
        flattenToText(m.about?.page),
        `Founded: ${siteConfig.foundedYear} in ${siteConfig.foundedIn}.`,
      ].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "careers",
      locale,
      title: m.careers?.page?.title ?? "Careers",
      urlPath: "/careers",
      metadata: { type: "careers" },
      body: [
        flattenToText(m.careers?.page),
        locale === "sv"
          ? "Ansök via karriärsidan: ladda upp ditt CV (PDF eller Word, max 5 MB). Vi hör av oss när det finns en passande roll. Frågor: info@prequaliq.com."
          : "Apply on the Careers page: upload your CV (PDF or Word, max 5 MB). We respond when there is a suitable role. Questions: info@prequaliq.com.",
      ].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "engagement",
      locale,
      title:
        locale === "sv"
          ? "Samarbete, process, tidslinjer och förfrågningar"
          : "Engagement, process, timelines, and inquiries",
      urlPath: "/contact",
      metadata: { type: "engagement" },
      body: buildEngagementBody(locale),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "capability-bridge",
      locale,
      title: locale === "sv" ? "E-upphandling — vägledning" : "E-procurement guidance",
      urlPath: "/",
      metadata: { type: "advisory_bridge" },
      body: getCapabilityBridgeBody(locale),
    }),
  );

  docs.push(
    doc({
      sourceType: "company",
      sourceKey: "contact",
      locale,
      title: m.contact?.page?.title ?? "Contact",
      urlPath: "/contact",
      metadata: { type: "contact", phones: siteConfig.phones, email: siteConfig.email },
      body: [
        flattenToText(m.contact),
        "",
        locale === "sv"
          ? `Kontaktuppgifter: Telefon / supportlinje: ${siteConfig.phones.join(", ")}. E-post: ${siteConfig.email}. Adress: ${siteConfig.address}.`
          : `Contact details: Phone / helpline: ${siteConfig.phones.join(", ")}. Email: ${siteConfig.email}. Address: ${siteConfig.address}.`,
      ].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "product",
      sourceKey: "prequaliq-eprocurement",
      locale,
      title: product.platformPage.title,
      urlPath: "/",
      metadata: { slug: "prequaliq-eprocurement" },
      body: [
        flattenToText(product.platformPage),
        flattenToText(product.features),
        flattenToText(m.products.prequaliqApps),
      ].join("\n\n"),
    }),
  );

  docs.push(
    doc({
      sourceType: "product",
      sourceKey: "enterprise-hub-note",
      locale,
      title: locale === "sv" ? "Enterprise Hub (ERP) — separat" : "Enterprise Hub (ERP) — separate",
      urlPath: "https://erp.prequaliq.com",
      metadata: { slug: "enterprise-hub" },
      body:
        locale === "sv"
          ? "Enterprise Hub är PrequaliQs ERP-produkt och ligger på erp.prequaliq.com. Denna webbplats handlar om Prequaliq e-upphandling, inte ERP-tjänster."
          : "Enterprise Hub is PrequaliQ's ERP product at erp.prequaliq.com. This website is about Prequaliq e-procurement, not ERP consulting services.",
    }),
  );

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

export function blogDocumentFromRow(
  row: {
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    publishedAt: Date | null;
    titleSv?: string | null;
    excerptSv?: string | null;
    contentSv?: string | null;
  },
  locale: Locale = "en",
): ChatContentDocument {
  const useSv = locale === "sv" && row.titleSv && row.contentSv;
  const title = useSv ? row.titleSv! : row.title;
  const excerpt = useSv ? row.excerptSv ?? row.excerpt : row.excerpt;
  const content = useSv ? row.contentSv! : row.content;
  const plain = stripHtml(content);
  return doc({
    sourceType: "blog",
    sourceKey: row.slug,
    locale,
    title,
    urlPath: `/blog/${row.slug}`,
    metadata: {
      slug: row.slug,
      publishedAt: row.publishedAt?.toISOString() ?? null,
    },
    body: [title, excerpt ?? "", plain].filter(Boolean).join("\n\n"),
  });
}

export { stripHtml };
