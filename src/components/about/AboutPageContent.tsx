"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTA } from "@/components/home/CTA";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";

export function AboutPageContent() {
  const t = useTranslations();
  const page = t.about.page;

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
          <div className="max-w-3xl mb-14 lg:mb-20">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {page.story.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-4">{page.story.title}</h2>
            <p className="text-muted leading-relaxed text-lg mb-4">{page.story.paragraph1}</p>
            <p className="text-muted leading-relaxed">{page.story.paragraph2}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-16 lg:mb-20">
            {page.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <p className="text-2xl font-bold text-foreground">{fact.value}</p>
                <p className="mt-2 text-sm text-muted">{fact.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-14 lg:mb-20">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {page.services.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {page.services.title}
            </h2>
            <p className="text-muted leading-relaxed max-w-3xl mb-10">{page.services.description}</p>

            <div className="grid md:grid-cols-3 gap-6">
              {page.services.pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-accent/30 hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-bold text-foreground mb-3">{pillar.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-5">{pillar.description}</p>
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                  >
                    {pillar.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-surface border border-border p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl font-bold text-foreground mb-2">{page.cta.title}</h2>
              <p className="text-muted text-sm leading-relaxed">{page.cta.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="md" icon>
                {page.cta.contact}
              </Button>
              <Button href="/careers" variant="outline" size="md">
                {page.cta.careers}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
