"use client";

import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";
import { prequaliqAppsImages } from "@/lib/static-images";
import { PLATFORM_REGISTER_URL } from "@/lib/platform-urls";
import { AiAssistance, ProcessSteps, TrustPoints } from "@/components/marketing/ProductSections";

/** The full feature list: what each side can do, the steps of a procurement, AI help and control points. */
export function PlatformPage() {
  const { locale } = useLanguage();
  const site = getProductSite(locale);
  const page = site.platformPage;
  const { openContactModal } = useContactModal();

  return (
    <>
      <PageHero
        title={page.title}
        description={page.description}
        backgroundImage={prequaliqAppsImages.hero}
        breadcrumb={[{ label: page.breadcrumb }]}
        homeLabel={locale === "sv" ? "Startsida" : "Home"}
        action={
          <Button variant="white" size="md" icon onClick={() => openContactModal()}>
            {site.nav.contactSales}
          </Button>
        }
      />

      <section className="section-light pattern-grid py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">{page.groupsEyebrow}</p>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground max-w-3xl">
            {page.groupsTitle}
          </h2>
          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            {page.groups.map((group) => (
              <section key={group.title} className="bg-card border border-border p-6 lg:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{group.subtitle}</p>
                <h3 className="font-display text-2xl font-semibold text-foreground">{group.title}</h3>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-1" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <AiAssistance />
      <TrustPoints />

      <section className="section-light pattern-diagonal py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">{site.cta.title}</h2>
          <p className="mt-3 text-muted">{site.cta.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" icon onClick={() => openContactModal()}>
              {site.cta.button}
            </Button>
            <Button href={PLATFORM_REGISTER_URL} size="lg" variant="outline" icon>
              {site.hero.ctaSupplier}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
