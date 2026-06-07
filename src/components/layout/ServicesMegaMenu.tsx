"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceMenuCategories } from "@/i18n";
import { useLanguage, useTranslations } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";

type ServicesMegaMenuProps = {
  onClose?: () => void;
};

export function ServicesMegaMenu({ onClose }: ServicesMegaMenuProps) {
  const { locale } = useLanguage();
  const t = useTranslations();
  const categories = getServiceMenuCategories(locale);

  return (
    <div className="w-[min(100vw-2rem,56rem)] bg-card rounded-2xl shadow-2xl shadow-primary/10 border border-border overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {categories.map((category) => (
          <div key={category.title} className="p-5">
            <h3 className="text-sm font-bold text-foreground mb-1">{category.title}</h3>
            <p className="text-xs text-muted leading-relaxed mb-3">{category.description}</p>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center justify-between gap-2 rounded-lg py-2 px-2 -mx-2 hover:bg-surface transition-colors"
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
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 px-5 py-3.5 bg-surface border-t border-border">
        <Button href="/services" variant="outline" size="sm" onClick={onClose}>
          {t.common.viewAll}
        </Button>
        <Button href="/contact" size="sm" icon onClick={onClose}>
          {t.common.getQuote}
        </Button>
      </div>
    </div>
  );
}
