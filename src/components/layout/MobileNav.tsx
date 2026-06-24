"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import type { getNavLinks } from "@/i18n";
import { getServiceMenuCategories } from "@/i18n";
import { Button } from "@/components/ui/Button";

type NavLink = ReturnType<typeof getNavLinks>[number];

type ExpertiseMenuItem = {
  slug: string;
  label: string;
};

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  expertiseItems: ExpertiseMenuItem[];
  locale: Locale;
  viewAllLabel: string;
  getStartedLabel: string;
  onGetStarted: () => void;
};

export function MobileNav({
  open,
  onClose,
  navLinks,
  expertiseItems,
  locale,
  viewAllLabel,
  getStartedLabel,
  onGetStarted,
}: MobileNavProps) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 top-16 z-[290] bg-black/40 lg:hidden"
        onClick={onClose}
        aria-label="Close menu"
      />
      <div
        className="fixed top-16 left-0 right-0 z-[300] max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-card border-b border-border shadow-xl lg:hidden pb-[env(safe-area-inset-bottom)]"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                className="block px-4 py-3 text-sm font-semibold text-foreground hover:text-primary rounded-xl hover:bg-surface min-h-11"
                onClick={() => !link.megaMenu && !link.expertiseMenu && onClose()}
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
                          className="block px-4 py-2.5 text-sm text-muted hover:text-primary min-h-11"
                          onClick={onClose}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {link.expertiseMenu && (
                <div className="pl-2 pb-4">
                  {expertiseItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/expertise/${item.slug}`}
                      className="block px-4 py-2.5 text-sm text-muted hover:text-primary min-h-11"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/expertise"
                    className="block px-4 py-2.5 text-sm font-semibold text-accent min-h-11"
                    onClick={onClose}
                  >
                    {viewAllLabel}
                  </Link>
                </div>
              )}

              {link.children && !link.megaMenu && !link.expertiseMenu && (
                <div className="pl-4 pb-2">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-muted hover:text-primary min-h-11"
                      onClick={onClose}
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
              className="w-full min-h-11"
              icon
              onClick={() => {
                onGetStarted();
                onClose();
              }}
            >
              {getStartedLabel}
            </Button>
          </div>
        </nav>
      </div>
    </>,
    document.body,
  );
}
