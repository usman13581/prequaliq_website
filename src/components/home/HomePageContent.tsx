"use client";

import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { GenericServiceCard } from "@/components/home/GenericServiceCard";
import { ProductCard } from "@/components/home/ProductCard";
import { Stats } from "@/components/home/Stats";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OracleSection } from "@/components/home/OracleSection";
import { ManagementSection } from "@/components/home/ManagementSection";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { CTA } from "@/components/home/CTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getHomeServiceHighlights, getProducts } from "@/i18n";
import { useLanguage, useTranslations } from "@/i18n/LanguageProvider";
import { Target, Compass } from "lucide-react";

const valueIcons = [Target, Compass];

export function HomePageContent() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const serviceHighlights = getHomeServiceHighlights(locale);
  const products = getProducts(locale);

  return (
    <>
      <Hero />
      <TrustedBy />

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.home.whatWeOffer.eyebrow}
            title={t.home.whatWeOffer.title}
            description={t.home.whatWeOffer.description}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {serviceHighlights.map((service) => (
              <GenericServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.home.products.eyebrow}
            title={t.home.products.title}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.slug} {...product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow={t.home.whoWeAre.eyebrow}
                title={t.home.whoWeAre.title}
                description={t.home.whoWeAre.description}
                align="left"
                className="mb-8"
              />
              <Button href="/team" icon>
                {t.home.whoWeAre.meetTeam}
              </Button>
            </div>

            <div className="grid gap-5">
              {t.home.values.map((value, i) => {
                const Icon = valueIcons[i] ?? Target;
                return (
                  <div
                    key={value.title}
                    className="flex gap-5 bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-accent-subtle text-accent flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1.5">{value.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Stats />
      <OracleSection />
      <ManagementSection />
      <FeaturedServices />
      <CTA />
    </>
  );
}
