"use client";

import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/home/ProductCard";
import { CTA } from "@/components/home/CTA";
import { getProducts } from "@/i18n";
import { useLanguage, useTranslations } from "@/i18n/LanguageProvider";
import { backgroundImages } from "@/lib/static-images";

export default function ProductsPage() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const products = getProducts(locale);

  return (
    <>
      <PageHero
        title={t.products.page.heroTitle}
        description={t.products.page.heroDescription}
        breadcrumb={[{ label: t.products.page.breadcrumb }]}
        backgroundImage={backgroundImages.pageHero}
        homeLabel={t.nav.home}
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {products.map((product, i) => (
              <ProductCard key={product.slug} {...product} index={i} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
