"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Briefcase, Info, Landmark, LayoutGrid, Mail, Menu, Newspaper, X, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageToggleLight, FloatingLanguageToggle } from "@/components/layout/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";
import { useContactModal } from "@/components/contact/ContactModalProvider";

export function ProductHeader() {
  const { locale } = useLanguage();
  const t = getProductSite(locale);
  const { openContactModal } = useContactModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links: { label: string; href: string; icon: LucideIcon }[] = [
    { label: t.nav.buyers, href: "/buyers", icon: Landmark },
    { label: t.nav.suppliers, href: "/suppliers", icon: Briefcase },
    { label: t.nav.platform, href: "/platform", icon: LayoutGrid },
    { label: t.nav.about, href: "/about", icon: Info },
    { label: t.nav.blog, href: "/blog", icon: Newspaper },
    { label: t.nav.contact, href: "/contact", icon: Mail },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
        <div
          className={`bg-card border-b border-border transition-colors duration-300 ${
            scrolled ? "lg:bg-card/90 lg:backdrop-blur-xl lg:shadow-sm" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-[4.5rem] gap-2">
              <Logo subtitle={t.brand.tagline} />

              <nav className="hidden lg:flex items-center gap-1">
                {links.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden />
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <LanguageToggleLight />
                </div>
                <Button
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={() => openContactModal()}
                >
                  {t.nav.contactSales}
                </Button>
                <button
                  type="button"
                  className="lg:hidden p-2 text-foreground"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileOpen((v) => !v)}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-b border-border bg-card">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-3 text-base font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-5 h-5 shrink-0 text-accent" aria-hidden />
                  {label}
                </Link>
              ))}
              <Button className="mt-3" onClick={() => { setMobileOpen(false); openContactModal(); }}>
                {t.nav.contactSales}
              </Button>
            </nav>
          </div>
        )}
      </header>
      <FloatingLanguageToggle />
    </>
  );
}
