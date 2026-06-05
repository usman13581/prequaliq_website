"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-data";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
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
          <p className="text-white/60">Trusted ERP &amp; Cloud Solutions — Sweden &amp; UAE</p>
        </div>
      </div>

      {/* Main nav */}
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
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-lg hover:bg-surface"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    </Link>
                    {openDropdown === link.label && (
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
                ),
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Button href="/contact" variant="outline" size="sm">
                Contact
              </Button>
              <Button href="/contact" size="sm" icon>
                Get Started
              </Button>
            </div>

            <button
              type="button"
              className="lg:hidden p-2.5 rounded-xl text-foreground hover:bg-surface transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border shadow-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary rounded-xl hover:bg-surface"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 pb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-muted hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 px-4 flex flex-col gap-2">
              <Button href="/contact" size="sm" className="w-full" icon>
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
