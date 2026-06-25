"use client";

import { PageHero } from "@/components/layout/PageHero";
import { CTA } from "@/components/home/CTA";
import { ExpertiseCard } from "./ExpertiseCard";
import { getExpertiseCatalog } from "@/i18n";
import { backgroundImages } from "@/lib/static-images";
import { useLanguage, useTranslations } from "@/i18n/LanguageProvider";

export function ExpertisePageContent() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const page = t.expertise.page;
  const items = getExpertiseCatalog(locale);

  return (
    <>
      <PageHero
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: page.breadcrumb }]}
        backgroundImage={backgroundImages.expertise}
        homeLabel={t.nav.home}
      />

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 animate-stagger">
            {items.map((item) => (
              <ExpertiseCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                shortDescription={item.shortDescription}
                stackPreview={item.stackPreview}
                image={item.image}
                learnMoreLabel={t.common.learnMore}
              />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
