import type { Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site-data";

/** User wants phone, email, address, or how to reach PrequaliQ. */
export function isContactInfoQuery(message: string): boolean {
  const lower = message.trim().toLowerCase();
  return /\b(phone|telephone|tel|call|email|e-mail|mail|address|location|office|kontakt|telefon|ring|mejl|adress|helpline|help\s*line|hotline|support\s*line|line\s*number|phone\s*number|contact\s*number|reach\s*(you|us)|get\s*in\s*touch|how\s*(to|can\s*i)\s*(contact|call|reach)|customer\s*support|speak\s*to\s*(someone|a\s*person|human))\b/i.test(
    lower,
  );
}

export function getContactRetrievalQueries(locale: Locale): string[] {
  const phones = siteConfig.phones.join(" ");
  if (locale === "sv") {
    return [
      `PrequaliQ telefon ${phones} kontakt e-post ${siteConfig.email} adress`,
      "PrequaliQ kontakt ring oss kundsupport telefonnummer",
    ];
  }
  return [
    `PrequaliQ phone ${phones} contact email ${siteConfig.email} address helpline`,
    "PrequaliQ contact call us customer support phone number get in touch",
  ];
}

/** Deterministic facts — do not rely on embedding match for phone/email. */
export function buildContactFactsBlock(locale: Locale): string {
  const phones = siteConfig.phones.join(", ");
  if (locale === "sv") {
    return `OFFICIELLA KONTAKTUPPGIFTER (använd dessa när användaren frågar om telefon, e-post, adress eller hur man når PrequaliQ):
Telefon / supportlinje: ${phones}
E-post: ${siteConfig.email}
Adress: ${siteConfig.address}
Kontaktsida: /contact`;
  }
  return `OFFICIAL CONTACT DETAILS (use these when the user asks for phone, helpline, email, address, or how to reach PrequaliQ):
Phone / helpline: ${phones}
Email: ${siteConfig.email}
Address: ${siteConfig.address}
Contact page: /contact`;
}
