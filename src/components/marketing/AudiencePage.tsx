"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";
import { prequaliqAppsImages } from "@/lib/static-images";
import { PLATFORM_REGISTER_URL } from "@/lib/platform-urls";

type AudienceKey = "buyersPage" | "suppliersPage";

export function AudiencePage({ kind }: { kind: AudienceKey }) {
  const { locale } = useLanguage();
  const site = getProductSite(locale);
  const content = site[kind];
  const { openContactModal } = useContactModal();
  const isSuppliers = kind === "suppliersPage";
  const signupLabel = locale === "sv" ? "Skapa gratis konto" : "Create free account";

  return (
    <>
      <PageHero
        title={content.title}
        description={content.description}
        backgroundImage={prequaliqAppsImages.hero}
        breadcrumb={[{ label: content.breadcrumb }]}
        homeLabel={locale === "sv" ? "Startsida" : "Home"}
        action={
          isSuppliers ? (
            <Button href={PLATFORM_REGISTER_URL} variant="white" size="md" icon>
              {signupLabel}
            </Button>
          ) : (
            <Button variant="white" size="md" icon onClick={() => openContactModal()}>
              {site.nav.contactSales}
            </Button>
          )
        }
      />

      <section className="py-16 sm:py-20 lg:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="space-y-0">
            {content.sections.map((section, i) => (
              <li
                key={section.title}
                className="relative grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-x-4 sm:gap-x-6 py-10 sm:py-12 border-t border-border first:border-t-0 first:pt-0"
              >
                <span
                  className="pt-1 text-sm font-bold tabular-nums tracking-widest text-accent"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-muted leading-relaxed text-base max-w-2xl">
                    {section.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">{site.cta.title}</h2>
          <p className="mt-3 text-muted">{site.cta.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {isSuppliers ? (
              <Button href={PLATFORM_REGISTER_URL} size="lg" icon>
                {signupLabel}
              </Button>
            ) : (
              <Button size="lg" icon onClick={() => openContactModal()}>
                {site.cta.button}
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
