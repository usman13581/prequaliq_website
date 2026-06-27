"use client";

import { FileText } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { useTranslations } from "@/i18n/LanguageProvider";

export function BlogPageContent() {
  const t = useTranslations();
  const page = t.blog.page;

  return (
    <>
      <PageHero
        title={page.title}
        description={page.description}
        breadcrumb={[{ label: page.breadcrumb }]}
        homeLabel={t.nav.home}
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-subtle text-accent mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">{page.emptyTitle}</h2>
          <p className="text-muted leading-relaxed">{page.emptyDescription}</p>
        </div>
      </section>
    </>
  );
}
