"use client";

import Image from "next/image";
import { CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";
import { prequaliqAppsImages } from "@/i18n/product-images";
import { useTranslations } from "@/i18n/LanguageProvider";

export default function PrequaliqAppsPage() {
  const t = useTranslations();
  const content = t.products.prequaliqApps;
  const images = prequaliqAppsImages;

  return (
    <>
      <PageHero
        title={content.title}
        description={content.tagline}
        breadcrumb={[
          { label: t.products.page.breadcrumb, href: "/products" },
          { label: content.title },
        ]}
      />

      {/* Hero visual */}
      <section className="py-12 lg:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-xl">
            <Image
              src={images.hero}
              alt={content.heroImageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent flex items-center">
              <div className="p-8 lg:p-12 max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {content.heroBadge}
                </span>
                <p className="text-white/95 text-lg leading-relaxed">
                  {content.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sweden focus */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-bold uppercase tracking-wider mb-4">
                {content.swedenFocus.badge}
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {content.swedenFocus.title}
              </h2>
              <p className="text-muted leading-relaxed mb-4">{content.swedenFocus.content}</p>
              <p className="text-muted leading-relaxed">{content.swedenFocus.secondary}</p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image
                src={images.swedenFocus}
                alt={content.swedenFocus.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is prequalification */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {content.whatIsIt.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-6">{content.whatIsIt.title}</h2>
            <p className="text-muted leading-relaxed text-base mb-6">{content.whatIsIt.content}</p>
            <p className="text-muted leading-relaxed text-base">{content.whatIsIt.secondary}</p>
          </div>
        </div>
      </section>

      {/* Audiences: procuring entities & suppliers */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {content.audiencesIntro.title}
            </h2>
            <p className="text-muted leading-relaxed">{content.audiencesIntro.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {content.audiences.map((audience, i) => (
              <article
                key={audience.title}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={images.audience[i]}
                    alt={audience.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                    {audience.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-3">{audience.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-6">{audience.description}</p>
                  <ul className="space-y-3">
                    {audience.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {content.featuresIntro.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-4">{content.featuresIntro.title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {content.features.map((feature, i) => (
              <article
                key={feature.title}
                className="flex gap-5 bg-card rounded-2xl p-6 border border-border"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                  <Image
                    src={images.features[i]}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Qualification process */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {content.qualificationProcess.title}
              </h2>
              <p className="text-muted leading-relaxed">{content.qualificationProcess.description}</p>
            </div>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image
                src={images.qualification}
                alt={content.qualificationProcess.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.qualificationProcess.steps.map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation in Sweden */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-lg order-2 lg:order-1">
              <Image
                src={images.implementation}
                alt={content.implementation.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                Live in production
              </p>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {content.implementation.title}
              </h2>
              <p className="text-muted leading-relaxed mb-8">{content.implementation.content}</p>
              <ul className="space-y-3">
                {content.implementation.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                    <span className="text-sm text-muted leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots gallery */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {content.screenshotsIntro.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-4">{content.screenshotsIntro.title}</h2>
            <p className="text-muted leading-relaxed">{content.screenshotsIntro.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {content.screenshots.map((shot, i) => (
              <figure
                key={shot.title}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={images.screenshots[i]}
                    alt={shot.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="font-bold text-foreground mb-1">{shot.title}</h3>
                  <p className="text-sm text-muted">{shot.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">{content.valuesIntro.title}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {content.values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-6 border border-border text-center"
              >
                <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-accent-subtle rounded-2xl p-8 lg:p-12 border border-accent/20 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">{content.cta.title}</h3>
            <p className="text-muted max-w-xl mx-auto mb-6">{content.cta.description}</p>
            <Button href="/contact" size="lg" icon>
              {content.cta.button}
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
