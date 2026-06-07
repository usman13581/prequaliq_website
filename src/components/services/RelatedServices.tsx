"use client";

import { ServicePreviewCard } from "./ServicePreviewCard";
import { useTranslations } from "@/i18n/LanguageProvider";

type ServiceItem = {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  image: string;
};

type RelatedServicesProps = {
  services: ServiceItem[];
};

export function RelatedServices({ services }: RelatedServicesProps) {
  const t = useTranslations();

  if (services.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-2">{t.services.page.relatedServices.title}</h2>
      <p className="text-muted mb-8 max-w-2xl">{t.services.page.relatedServices.description}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServicePreviewCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
