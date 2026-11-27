"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  Briefcase, FileText, Info, Landmark, LayoutGrid, LogIn, Mail, MapPin, Newspaper, Phone, ShieldCheck, UserPlus, Users,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-data";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";
import { LegalModal } from "@/components/ui/LegalModal";
import type { LegalDocumentType } from "@/lib/legal-content";
import { PLATFORM_LOGIN_URL, PLATFORM_REGISTER_URL } from "@/lib/platform-urls";

export function ProductFooter() {
  const { locale } = useLanguage();
  const t = getProductSite(locale);
  const year = new Date().getFullYear();
  const [legalModal, setLegalModal] = useState<LegalDocumentType | null>(null);
  const closeLegal = useCallback(() => setLegalModal(null), []);

  // One icon per entry, in a fixed-width slot so every label starts on the same line.
  const rowClass = "inline-flex items-center gap-2.5 text-left hover:text-white transition-colors";
  const iconClass = "w-4 h-4 shrink-0 text-white/50";
  type FooterLink = { label: string; icon: LucideIcon; href?: string; external?: boolean; onClick?: () => void };
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: t.footer.buyersTitle,
      links: [
        { label: t.nav.buyers, icon: Landmark, href: "/buyers" },
        { label: t.nav.platform, icon: LayoutGrid, href: "/platform" },
        { label: t.nav.login, icon: LogIn, href: PLATFORM_LOGIN_URL, external: true },
      ],
    },
    {
      title: t.footer.suppliersTitle,
      links: [
        { label: t.nav.suppliers, icon: Briefcase, href: "/suppliers" },
        { label: locale === "sv" ? "Skapa gratis konto" : "Create free account", icon: UserPlus, href: PLATFORM_REGISTER_URL, external: true },
        { label: t.nav.contact, icon: Mail, href: "/contact" },
      ],
    },
    {
      title: t.footer.companyTitle,
      links: [
        { label: t.nav.about, icon: Info, href: "/about" },
        { label: t.nav.blog, icon: Newspaper, href: "/blog" },
        { label: t.nav.careers, icon: Users, href: "/careers" },
      ],
    },
    {
      title: t.footer.legalTitle,
      links: [
        { label: t.footer.privacy, icon: ShieldCheck, onClick: () => setLegalModal("privacy") },
        { label: t.footer.terms, icon: FileText, onClick: () => setLegalModal("terms") },
      ],
    },
  ];

  return (
    <>
      <footer className="bg-surface-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Logo variant="light" subtitle={t.brand.tagline} />
              <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">{t.footer.blurb}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className={rowClass}>
                    <Mail className={iconClass} aria-hidden />
                    {siteConfig.email}
                  </a>
                </li>
                {siteConfig.phones.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className={rowClass}>
                      <Phone className={iconClass} aria-hidden />
                      {phone}
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-2.5">
                  <MapPin className={`${iconClass} mt-0.5`} aria-hidden />
                  <span>{siteConfig.address}</span>
                </li>
              </ul>
            </div>

            {columns.map((column) => (
              <div key={column.title} className="lg:col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">{column.title}</p>
                <ul className="space-y-2.5 text-sm text-white/80">
                  {column.links.map(({ label, icon: Icon, href, external, onClick }) => (
                    <li key={label}>
                      {onClick ? (
                        <button type="button" className={rowClass} onClick={onClick}>
                          <Icon className={iconClass} aria-hidden />
                          {label}
                        </button>
                      ) : external ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                          <Icon className={iconClass} aria-hidden />
                          {label}
                        </a>
                      ) : (
                        <Link href={href ?? "/"} className={rowClass}>
                          <Icon className={iconClass} aria-hidden />
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-white/50">
            <p>
              © {year} {t.brand.name}. {t.footer.copyright}
            </p>
            <p className="text-white/40">prequaliq.com</p>
          </div>
        </div>
      </footer>
      <LegalModal type={legalModal} onClose={closeLegal} />
    </>
  );
}
