"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

type ServicePreview = {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  image: string;
};

type ServicePreviewCardProps = {
  service: ServicePreview;
};

export function ServicePreviewCard({ service }: ServicePreviewCardProps) {
  const t = useTranslations();

  return (
    <article className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-white/90">
          {service.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed flex-1">{service.shortDescription}</p>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 mt-5 pt-5 border-t border-border text-sm font-semibold text-accent group/link"
        >
          {t.common.readMore}
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
