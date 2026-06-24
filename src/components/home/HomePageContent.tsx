"use client";

import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { ExpertiseGrid } from "@/components/expertise/ExpertiseGrid";
import { ServiceModels } from "@/components/home/ServiceModels";
import { ProductsCompact } from "@/components/home/ProductsCompact";
import { CTA } from "@/components/home/CTA";
import { getExpertiseCatalog, getProducts } from "@/i18n";
import { useLanguage, useTranslations } from "@/i18n/LanguageProvider";

export function HomePageContent() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const expertiseItems = getExpertiseCatalog(locale);
  const products = getProducts(locale);

  return (
    <>
      <Hero />
      <Process />
      <ExpertiseGrid
        eyebrow={t.home.expertise.eyebrow}
        title={t.home.expertise.title}
        description={t.home.expertise.description}
        viewAllLabel={t.expertise.page.viewAll}
        learnMoreLabel={t.common.learnMore}
        items={expertiseItems.map((item) => ({
          slug: item.slug,
          title: item.title,
          shortDescription: item.shortDescription,
          stackPreview: item.stackPreview,
        }))}
      />
      <ServiceModels
        eyebrow={t.home.serviceModels.eyebrow}
        title={t.home.serviceModels.title}
        description={t.home.serviceModels.description}
        models={t.home.serviceModels.items.map((item) => ({
          title: item.title,
          description: item.description,
          href: item.href,
          cta: item.cta,
        }))}
      />
      <ProductsCompact
        eyebrow={t.home.platforms.eyebrow}
        title={t.home.platforms.title}
        description={t.home.platforms.description}
        viewAllLabel={t.common.viewAll}
        exploreLabel={t.common.exploreProduct}
        products={products}
      />
      <CTA />
    </>
  );
}
