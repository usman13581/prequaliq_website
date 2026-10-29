"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-data";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";
import { LegalModal } from "@/components/ui/LegalModal";
import type { LegalDocumentType } from "@/lib/legal-content";

export function ProductFooter() {
  const { locale } = useLanguage();
  const t = getProductSite(locale);
  const year = new Date().getFullYear();
  const [legalModal, setLegalModal] = useState<LegalDocumentType | null>(null);
  const closeLegal = useCallback(() => setLegalModal(null), []);

  return (
    <>
      <footer className="bg-surface-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Logo variant="light" subtitle={t.brand.tagline} />
              <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">{t.footer.blurb}</p>
              <div className="mt-6 space-y-1 text-sm text-white/70">
                <p>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                    {siteConfig.email}
                  </a>
                </p>
                {siteConfig.phones.map((phone) => (
                  <p key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">
                      {phone}
                    </a>
                  </p>
                ))}
                <p>{siteConfig.address}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                {t.footer.buyersTitle}
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/buyers" className="hover:text-white">
                    {t.nav.buyers}
                  </Link>
                </li>
                <li>
                  <Link href="/#platform" className="hover:text-white">
                    {t.nav.platform}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                {t.footer.suppliersTitle}
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/suppliers" className="hover:text-white">
                    {t.nav.suppliers}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                {t.footer.companyTitle}
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/about" className="hover:text-white">
                    {t.nav.about}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    {t.nav.blog}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                {t.footer.legalTitle}
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <button type="button" className="hover:text-white" onClick={() => setLegalModal("privacy")}>
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white" onClick={() => setLegalModal("terms")}>
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>
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
