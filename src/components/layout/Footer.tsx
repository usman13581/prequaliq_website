"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-data";
import { getFooterHelpLinks, getFooterQuickLinks } from "@/i18n";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LegalModal } from "@/components/ui/LegalModal";
import type { LegalDocumentType } from "@/lib/legal-content";

export function Footer() {
  const { locale, messages: t } = useLanguage();
  const helpLinks = getFooterHelpLinks(locale);
  const quickLinks = getFooterQuickLinks(locale);
  const [legalModal, setLegalModal] = useState<LegalDocumentType | null>(null);
  const closeLegal = useCallback(() => setLegalModal(null), []);

  const socialLabels: Record<keyof typeof siteConfig.social, string> = {
    linkedin: "in",
    twitter: "X",
    facebook: "f",
    instagram: "ig",
  };

  return (
    <>
      <footer className="bg-surface-dark text-white">
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl text-white font-bold leading-snug">{t.footer.ctaTitle}</h3>
              <p className="text-slate-400 text-sm mt-1">{t.footer.ctaSubtitle}</p>
            </div>
            <Button href="/contact" variant="white" icon>
              {t.footer.contactUs}
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Logo variant="light" subtitle={t.site.logoTagline} />
              <p className="text-slate-400 text-sm leading-relaxed mt-6 mb-8 max-w-sm">
                {t.site.description}
              </p>
              <div className="flex gap-3">
                {(Object.keys(siteConfig.social) as Array<keyof typeof siteConfig.social>).map(
                  (platform) => {
                    const href = siteConfig.social[platform];
                    const isExternal = href.startsWith("http");
                    return (
                      <a
                        key={platform}
                        href={href}
                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-accent border border-white/10 hover:border-accent transition-all text-xs font-bold"
                        aria-label={platform}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {socialLabels[platform]}
                      </a>
                    );
                  },
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-5">
                {t.footer.helpAndAdvice}
              </h3>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.label}>
                    {"legal" in link ? (
                      <button
                        type="button"
                        onClick={() => setLegalModal(link.legal!)}
                        className="text-slate-300 hover:text-white text-sm transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-5">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 mb-5">
                {t.nav.contact}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-white text-sm transition-colors group"
                  >
                    <span className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                    {siteConfig.email}
                  </a>
                </li>
                {siteConfig.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-slate-300 hover:text-white text-sm transition-colors group"
                    >
                      <span className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Phone className="w-4 h-4" />
                      </span>
                      {phone}
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="leading-relaxed pt-1.5">{siteConfig.address}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} {t.site.name}. {t.footer.copyright}
            </p>
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => setLegalModal("privacy")}
                className="hover:text-white transition-colors"
              >
                {t.footer.helpLinks.privacyPolicy}
              </button>
              <button
                type="button"
                onClick={() => setLegalModal("terms")}
                className="hover:text-white transition-colors"
              >
                {t.footer.helpLinks.termsConditions}
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal type={legalModal} onClose={closeLegal} />
    </>
  );
}
