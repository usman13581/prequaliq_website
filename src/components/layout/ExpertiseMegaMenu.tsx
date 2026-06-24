/**
 * EXPERTISE MEGA MENU — desktop dropdown + mobile accordion content
 *
 * Desktop (lg+): 2×4 grid of expertise links, mirrors ServicesMegaMenu width
 * Mobile: rendered inside Header accordion — touch targets min-h-11 (py-3)
 *
 * Grouping option: 2 columns × 4 rows (flat) OR grouped by domain
 * (Enterprise platforms | Development | Integration | Consulting)
 */
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ExpertiseSlug } from "@/lib/expertise-structure";

export type ExpertiseMenuItem = {
  slug: ExpertiseSlug;
  label: string;
};

type ExpertiseMegaMenuProps = {
  items: ExpertiseMenuItem[];
  onClose?: () => void;
  viewAllLabel?: string;
  contactLabel?: string;
};

export function ExpertiseMegaMenu({
  items,
  onClose,
  viewAllLabel = "View all expertise",
  contactLabel = "Get in touch",
}: ExpertiseMegaMenuProps) {
  return (
    <div className="w-[min(100vw-2rem,42rem)] bg-card rounded-2xl shadow-2xl shadow-primary/10 border border-border overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
        <ul className="p-4 sm:p-5 space-y-0.5">
          {items.slice(0, Math.ceil(items.length / 2)).map((item) => (
            <li key={item.slug}>
              <Link
                href={`/expertise/${item.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between gap-2 rounded-xl py-3 px-3 min-h-11 hover:bg-surface transition-colors"
              >
                <span className="text-sm text-foreground/80 group-hover:text-accent transition-colors">
                  {item.label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-light opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="p-4 sm:p-5 space-y-0.5">
          {items.slice(Math.ceil(items.length / 2)).map((item) => (
            <li key={item.slug}>
              <Link
                href={`/expertise/${item.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between gap-2 rounded-xl py-3 px-3 min-h-11 hover:bg-surface transition-colors"
              >
                <span className="text-sm text-foreground/80 group-hover:text-accent transition-colors">
                  {item.label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-light opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col xs:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 bg-surface border-t border-border">
        <Button href="/expertise" variant="outline" size="sm" onClick={onClose} className="w-full sm:w-auto">
          {viewAllLabel}
        </Button>
        <Button href="/contact" size="sm" icon onClick={onClose} className="w-full sm:w-auto">
          {contactLabel}
        </Button>
      </div>
    </div>
  );
}

/**
 * MOBILE ACCORDION — use inside Header.tsx mobile nav
 *
 * Pattern:
 * <button aria-expanded> Expertise <ChevronDown /></button>
 * {expanded && <ExpertiseMegaMenu variant="mobile" />} OR flat link list with min-h-11
 *
 * Header updates needed (not in this file):
 * - nav order: Services | Expertise | Products | Contact
 * - Remove Home + Team from primary nav
 * - mobileOpen: add body overflow-hidden + focus trap
 * - Contact on mobile: openContactModal() instead of /contact page (optional)
 * - Separate accordion state per dropdown (servicesOpen, expertiseOpen)
 */
