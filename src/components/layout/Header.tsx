"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-data";
import { getNavLinks, getServiceMenuCategories } from "@/i18n";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { LanguageToggle, LanguageToggleLight } from "@/components/layout/LanguageToggle";
import { useContactModal } from "@/components/contact/ContactModalProvider";

export function Header() {
  const { locale, messages: t } = useLanguage();
  const { openContactModal } = useContactModal();
  const navLinks = getNavLinks(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenus = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  return (
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
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-card/90 backdrop-blur-xl shadow-sm shadow-primary/5 border-b border-border"
            : "bg-card border-b border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
            <Logo />

            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const hasDropdown = link.megaMenu || (link.children && link.children.length > 0);
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

                    {openDropdown === link.label && link.children && !link.megaMenu && (
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
              <Button href="/contact" variant="outline" size="sm">
                {t.nav.contact}
              </Button>
              <Button size="sm" icon onClick={openContactModal}>
                {t.nav.getStarted}
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageToggleLight />
              <button
                type="button"
                className="p-2.5 rounded-xl text-foreground hover:bg-surface transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border shadow-xl max-h-[85vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-sm font-semibold text-foreground hover:text-primary rounded-xl hover:bg-surface"
                  onClick={() => !link.megaMenu && closeMenus()}
                >
                  {link.label}
                </Link>

                {link.megaMenu && (
                  <div className="pl-2 pb-4 space-y-4">
                    {getServiceMenuCategories(locale).map((category) => (
                      <div key={category.title} className="pt-2">
                        <p className="px-4 text-xs font-bold uppercase tracking-wider text-accent mb-1">
                          {category.title}
                        </p>
                        {category.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-muted hover:text-primary"
                            onClick={closeMenus}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {link.children && !link.megaMenu && (
                  <div className="pl-4 pb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-muted hover:text-primary"
                        onClick={closeMenus}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 px-4 flex flex-col gap-2">
              <Button
                size="sm"
                className="w-full"
                icon
                onClick={() => {
                  openContactModal();
                  closeMenus();
                }}
              >
                {t.nav.getStarted}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
