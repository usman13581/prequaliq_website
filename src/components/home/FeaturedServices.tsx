"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Calendar, ArrowRight } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

export function FeaturedServices() {
  const t = useTranslations();

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.home.featuredServices.eyebrow}
          title={t.home.featuredServices.title}
          description={t.home.featuredServices.description}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {t.home.featuredServices.items.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-accent/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-muted-light mb-4">
                <Calendar className="w-3.5 h-3.5" />
                {service.date}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                {t.common.readMore}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
