"use client";

import { PageHero } from "@/components/layout/PageHero";
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm";
import { useTranslations } from "@/i18n/LanguageProvider";

export function CareersPageContent() {
  const t = useTranslations();
  const page = t.careers.page;

  return (
    <>
      <PageHero
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: page.breadcrumb }]}
        homeLabel={t.nav.home}
      />

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                {page.eyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{page.introTitle}</h2>
              <p className="text-muted leading-relaxed">{page.introDescription}</p>
            </div>

            <CareerApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
