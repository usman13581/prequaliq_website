"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";

type BillingCycle = "monthly" | "annual";

export function EnterpriseHubPricing() {
  const t = useTranslations();
  const pricing = t.products.enterpriseHub.pricing;
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section id="enterprise-hub-pricing" className="py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            {pricing.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{pricing.title}</h2>
          <p className="text-muted leading-relaxed mb-3">{pricing.description}</p>
          <p className="text-sm text-muted-light">{pricing.currencyNote}</p>
        </div>

        <div className="flex justify-center mb-12">
          <div
            role="group"
            aria-label={`${pricing.monthly} / ${pricing.annual}`}
            className="inline-flex rounded-full border border-border bg-surface p-1"
          >
            <button
              type="button"
              aria-pressed={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                billing === "monthly"
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {pricing.monthly}
            </button>
            <button
              type="button"
              aria-pressed={billing === "annual"}
              onClick={() => setBilling("annual")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                billing === "annual"
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {pricing.annual}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {pricing.plans.map((plan) => {
            const isCustom = plan.cta === "contact";
            const featured = "featured" in plan && plan.featured === true;
            const price = isCustom
              ? null
              : billing === "monthly"
                ? plan.monthlyPrice
                : plan.annualPrice;
            const period = billing === "monthly" ? pricing.perMonth : pricing.perYear;

            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-card p-6 sm:p-8 transition-shadow ${
                  featured
                    ? "border-accent shadow-lg shadow-accent/10 lg:-translate-y-1"
                    : "border-border hover:border-accent/30 hover:shadow-md"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-6 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      featured
                        ? "bg-accent text-white"
                        : "bg-accent-subtle text-accent border border-accent/20"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6 pt-2">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-medium text-foreground">{pricing.usersLabel}:</span>{" "}
                    {plan.users}
                  </p>
                </div>

                <div className="mb-8 min-h-[5.5rem]">
                  {isCustom ? (
                    <p className="text-2xl font-bold text-foreground leading-snug">
                      {plan.priceLabel}
                    </p>
                  ) : (
                    <>
                      <p className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-bold tracking-tight text-foreground">
                          {price}
                        </span>
                        <span className="text-sm text-muted">{period}</span>
                      </p>
                      {billing === "annual" && (
                        <p className="mt-2 text-xs text-muted-light">
                          {pricing.billedAnnually}
                          {plan.id === "basic"
                            ? ` · ${pricing.annualSaveBasic}`
                            : plan.id === "standard"
                              ? ` · ${pricing.annualSaveStandard}`
                              : ""}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={isCustom ? "/contact" : "#enterprise-hub-trial"}
                  variant={featured ? "primary" : isCustom ? "outline" : "secondary"}
                  size="md"
                  icon
                  className="w-full"
                >
                  {isCustom ? pricing.contactCta : pricing.trialCta}
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
