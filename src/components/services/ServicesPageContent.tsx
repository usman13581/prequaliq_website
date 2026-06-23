"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CTA } from "@/components/home/CTA";
import { ServicePreviewCard } from "@/components/services/ServicePreviewCard";
import { getCatalogServices, getServiceMenuCategories } from "@/i18n";
import { useLanguage, useTranslations } from "@/i18n/LanguageProvider";
import { backgroundImages } from "@/lib/static-images";

export function ServicesPageContent() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const categories = getServiceMenuCategories(locale);

  return (
    <>
      <PageHero
        title={t.services.page.hero.title}
        description={t.services.page.hero.description}
        breadcrumb={[{ label: t.services.page.hero.breadcrumb }]}
        backgroundImage={backgroundImages.pageHero}
        homeLabel={t.nav.home}
      />

      <section className="sticky top-[72px] z-30 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={`#${categoryToId(category.title)}`}
                className="px-4 py-2 rounded-full text-sm font-medium text-muted hover:text-accent hover:bg-accent-subtle transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {categories.map((category) => {
            const services = getCatalogServices(locale).filter((s) =>
              category.items.some((item) => item.href === `/services/${s.slug}`),
            );

            return (
              <div key={category.title} id={categoryToId(category.title)} className="scroll-mt-36">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                      {category.title}
                    </p>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{category.title}</h2>
                    <p className="text-muted leading-relaxed max-w-xl">{category.description}</p>
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-lg">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServicePreviewCard key={service.slug} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTA />
    </>
  );
}

function categoryToId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}
