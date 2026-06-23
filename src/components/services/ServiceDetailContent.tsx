"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";
import { RelatedServices } from "@/components/services/RelatedServices";
import { getCatalogService, getRelatedServices } from "@/i18n";
import { useLanguage, useTranslations } from "@/i18n/LanguageProvider";

export function ServiceDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLanguage();
  const t = useTranslations();
  const service = getCatalogService(locale, slug);

  if (!service) notFound();

  const related = getRelatedServices(locale, slug);

  return (
    <>
      <PageHero
        title={service.title}
        description={service.shortDescription}
        breadcrumb={[
          { label: t.services.page.hero.breadcrumb, href: "/services" },
          { label: service.title },
        ]}
        backgroundImage={service.image}
        homeLabel={t.nav.home}
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                {service.category}
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.services.page.overview}</h2>
              <p className="text-muted leading-relaxed text-base mb-8">{service.description}</p>
              <Button href="/contact" size="lg" icon>
                {t.services.page.discussProject}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-6">{t.services.page.whatWeDeliver}</h3>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/40 flex items-end p-8">
                <p className="text-white text-lg font-semibold leading-snug max-w-sm">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </div>

          <RelatedServices services={related} />

          <div className="mt-16 bg-accent-subtle rounded-2xl p-8 lg:p-12 border border-accent/20 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">{t.services.page.readyTitle}</h3>
            <p className="text-muted mb-6 max-w-xl mx-auto">{t.services.page.readyDescription}</p>
            <Button href="/contact" size="lg" icon className="mt-4">
              {t.services.page.contactUs}
            </Button>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
