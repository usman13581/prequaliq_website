"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";
import { prequaliqAppsImages } from "@/lib/static-images";

type AudienceKey = "buyersPage" | "suppliersPage";

export function AudiencePage({ kind }: { kind: AudienceKey }) {
  const { locale } = useLanguage();
  const site = getProductSite(locale);
  const content = site[kind];
  const { openContactModal } = useContactModal();

  return (
    <>
      <PageHero
        title={content.title}
        description={content.description}
        backgroundImage={prequaliqAppsImages.hero}
        breadcrumb={[{ label: content.breadcrumb }]}
        homeLabel={locale === "sv" ? "Startsida" : "Home"}
        action={
          <Button variant="white" size="md" icon onClick={() => openContactModal()}>
            {site.nav.contactSales}
          </Button>
        }
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {content.sections.map((section, i) => (
            <article
              key={section.title}
              className={`grid lg:grid-cols-12 gap-8 items-start ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-4">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {section.title}
                </h2>
              </div>
              <p className="lg:col-span-7 text-muted leading-relaxed text-base">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">{site.cta.title}</h2>
          <p className="mt-3 text-muted">{site.cta.description}</p>
          <div className="mt-6">
            <Button size="lg" icon onClick={() => openContactModal()}>
              {site.cta.button}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
