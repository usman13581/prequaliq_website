"use client";

import { useParams, notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";
import { TechStackList } from "./TechStackList";
import { ExpertiseCard } from "./ExpertiseCard";
import { getExpertiseItem, getRelatedExpertise } from "@/i18n";
import { useLanguage, useTranslations } from "@/i18n/LanguageProvider";
import { useContactModal } from "@/components/contact/ContactModalProvider";

export function ExpertiseDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLanguage();
  const t = useTranslations();
  const page = t.expertise.page;
  const expertise = getExpertiseItem(locale, slug);
  const { openContactModal } = useContactModal();

  if (!expertise) notFound();

  const related = getRelatedExpertise(locale, slug);

  return (
    <>
      <PageHero
        title={expertise.title}
        description={expertise.shortDescription}
        breadcrumb={[
          { label: page.breadcrumb, href: "/expertise" },
          { label: expertise.title },
        ]}
        homeLabel={t.nav.home}
      />

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 lg:mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {page.practiceLead}
            </p>
            <p className="text-muted leading-relaxed text-base max-w-3xl">
              {expertise.heroDescription}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-6">{page.deliversTitle}</h3>
              <ul className="space-y-4">
                {expertise.delivers.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <TechStackList
              title={page.stackTitle}
              categories={expertise.stackGroups.map((g) => ({
                label: g.title,
                items: g.items,
              }))}
            />
          </div>

          <div className="mb-12 lg:mb-16">
            <h3 className="text-xl font-bold text-foreground mb-6">{page.engagementsTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
              {expertise.engagements.map((engagement) => (
                <div
                  key={engagement.title}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
                >
                  <h4 className="text-base font-bold text-foreground mb-2">{engagement.title}</h4>
                  <p className="text-muted text-sm leading-relaxed">{engagement.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-12 lg:mb-16">
            <Button size="lg" icon onClick={openContactModal}>
              {expertise.cta}
            </Button>
          </div>

          {related.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">{page.relatedTitle}</h3>
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:gap-6">
                {related.map((item) => (
                  <div
                    key={item.slug}
                    className="flex-shrink-0 w-[min(85vw,320px)] sm:w-auto snap-start"
                  >
                    <ExpertiseCard
                      slug={item.slug}
                      title={item.title}
                      shortDescription={item.shortDescription}
                      stackPreview={item.stackPreview}
                      learnMoreLabel={t.common.learnMore}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
