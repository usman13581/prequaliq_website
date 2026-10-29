"use client";

import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { PLATFORM_REGISTER_URL } from "@/lib/platform-urls";

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-accent mx-auto" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="w-5 h-5 text-muted-light mx-auto" aria-label="Not included" />;
  }
  return <span className="text-sm text-muted">{value}</span>;
}

export function PricingPageContent() {
  const t = useTranslations();
  const page = t.pricing.page;
  const { openContactModal } = useContactModal();

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
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">{page.eyebrow}</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">{page.introTitle}</h2>
            <p className="text-muted leading-relaxed text-lg">{page.introDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16 lg:mb-20 max-w-4xl">
            {page.plans.map((plan) => (
              <article
                key={plan.id}
                className={`rounded-2xl border p-6 sm:p-8 flex flex-col ${
                  plan.featured
                    ? "border-accent bg-card shadow-sm ring-1 ring-accent/20"
                    : "border-border bg-card"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  {plan.badge}
                </p>
                <h3 className="text-2xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-lg font-semibold text-foreground">{plan.priceLabel}</p>
                <p className="text-sm text-muted mb-4">{plan.priceHint}</p>
                <p className="text-sm text-muted leading-relaxed mb-8 flex-1">{plan.description}</p>
                <Button href={PLATFORM_REGISTER_URL} size="md" className="w-full" icon>
                  {plan.cta}
                </Button>
              </article>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{page.compareTitle}</h2>
            <p className="text-muted">{page.compareSubtitle}</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card mb-12">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-4 text-sm font-semibold text-foreground w-[40%]">Feature</th>
                  <th className="px-4 py-4 text-sm font-semibold text-foreground text-center">
                    {page.plans[0]?.name}
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-foreground text-center">
                    {page.plans[1]?.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.featureGroups.map((group) => (
                  <Fragment key={group.name}>
                    <tr className="bg-surface/60">
                      <td
                        colSpan={3}
                        className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-accent"
                      >
                        {group.name}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.feature} className="border-t border-border">
                        <td className="px-4 py-3 text-sm text-foreground">{row.feature}</td>
                        <td className="px-4 py-3 text-center">
                          <FeatureCell value={row.basic} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <FeatureCell value={row.advanced} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted text-center max-w-2xl mx-auto mb-3">{page.note}</p>
          <p className="text-sm text-muted text-center max-w-2xl mx-auto mb-14">{page.buyerNote}</p>

          <div className="rounded-2xl bg-surface border border-border p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl font-bold text-foreground mb-2">{page.ctaTitle}</h2>
              <p className="text-muted text-sm leading-relaxed">{page.ctaDescription}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={PLATFORM_REGISTER_URL} size="md" icon>
                {page.ctaButton}
              </Button>
              <Button type="button" variant="outline" size="md" onClick={openContactModal}>
                {page.buyerCta}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
