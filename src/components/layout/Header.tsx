"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { ChevronDown, Menu, X, Mail, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-data";
import {
  getNavLinks,
  getExpertiseMenuItems,
} from "@/i18n";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { ExpertiseMegaMenu } from "@/components/layout/ExpertiseMegaMenu";
import { LanguageToggle, LanguageToggleLight } from "@/components/layout/LanguageToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { useContactModal } from "@/components/contact/ContactModalProvider";

export function Header() {
  const { locale, messages: t } = useLanguage();
  const { openContactModal } = useContactModal();
  const navLinks = getNavLinks(locale);
  const expertiseItems = getExpertiseMenuItems(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const closeMenus = useCallback(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="hidden lg:block bg-primary text-white/80 text-xs border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-9">
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3 h-3" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phones[0].replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3" />
                {siteConfig.phones[0]}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white/60 hidden xl:block">{t.site.topBar}</p>
              <LanguageToggle />
            </div>
          </div>
        </div>

        <div
          className={`bg-card border-b border-border transition-colors duration-300 ${
            scrolled
              ? "lg:bg-card/90 lg:backdrop-blur-xl lg:shadow-sm lg:shadow-primary/5"
              : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-[4.5rem] gap-2">
              <div className="min-w-0 flex-1 sm:flex-none">
                <Logo subtitle={t.site.logoTagline} />
              </div>

              <nav className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const hasDropdown =
                    link.megaMenu ||
                    link.expertiseMenu ||
                    (link.children && link.children.length > 0);
                  return hasDropdown ? (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-surface ${
                          openDropdown === link.label
                            ? "text-primary bg-surface"
                            : "text-foreground/70 hover:text-primary"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                        />
                      </Link>

                      {openDropdown === link.label && link.megaMenu && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                          <ServicesMegaMenu onClose={() => setOpenDropdown(null)} />
                        </div>
                      )}

                      {openDropdown === link.label && link.expertiseMenu && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                          <ExpertiseMegaMenu
                            items={expertiseItems}
                            onClose={() => setOpenDropdown(null)}
                            viewAllLabel={t.expertise.page.viewAll}
                            contactLabel={t.nav.contact}
                          />
                        </div>
                      )}

                      {openDropdown === link.label && link.children && !link.megaMenu && !link.expertiseMenu && (
                        <div className="absolute top-full left-0 pt-2">
                          <div className="w-64 bg-card rounded-2xl shadow-2xl shadow-primary/10 border border-border p-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-3 text-sm text-foreground/70 hover:text-primary hover:bg-surface rounded-xl transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-lg hover:bg-surface"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden lg:flex items-center gap-3">
                <Button size="sm" icon onClick={openContactModal}>
                  {t.nav.getStarted}
                </Button>
              </div>

              <div className="flex items-center gap-1 shrink-0 lg:hidden">
                <button
                  type="button"
                  onClick={openContactModal}
                  className="h-10 w-10 flex items-center justify-center rounded-xl text-foreground bg-surface/80 active:bg-surface transition-colors"
                  aria-label={t.nav.getStarted}
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <LanguageToggleLight />
                <button
                  type="button"
                  className="h-10 w-10 flex items-center justify-center rounded-xl text-foreground bg-surface/80 active:bg-surface transition-colors"
                  onClick={() => setMobileOpen((open) => !open)}
                  aria-expanded={mobileOpen}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={closeMenus}
        navLinks={navLinks}
        expertiseItems={expertiseItems}
        locale={locale}
        viewAllLabel={t.expertise.page.viewAll}
        getStartedLabel={t.nav.getStarted}
        onGetStarted={openContactModal}
      />
    </>
  );
}
