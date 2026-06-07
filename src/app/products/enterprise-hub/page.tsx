"use client";

import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";
import { enterpriseHubImages } from "@/i18n/product-images";
import { useTranslations } from "@/i18n/LanguageProvider";

export default function EnterpriseHubPage() {
  const t = useTranslations();
  const content = t.products.enterpriseHub;
  const images = enterpriseHubImages;

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
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent flex items-center">
              <div className="p-8 lg:p-12 max-w-xl">
                <p className="text-white/90 text-lg leading-relaxed">
                  {content.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is ERP */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {content.whatIsErp.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-6">{content.whatIsErp.title}</h2>
            <p className="text-muted leading-relaxed text-base mb-6">{content.whatIsErp.content}</p>
            <p className="text-muted leading-relaxed text-base">{content.whatIsErp.secondary}</p>
          </div>
        </div>
      </section>

      {/* Ready for implementation */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image
                src={images.readyForImplementation}
                alt={content.readyForImplementation.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {content.readyForImplementation.title}
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                {content.readyForImplementation.content}
              </p>
              <ul className="space-y-3">
                {content.readyForImplementation.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ERP modules */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
              {content.modulesIntro.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-4">{content.modulesIntro.title}</h2>
            <p className="text-muted leading-relaxed">{content.modulesIntro.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.modules.map((module, i) => (
              <article
                key={module.title}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={images.modules[i]}
                    alt={module.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{module.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{module.description}</p>
                  <ul className="space-y-2">
                    {module.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted">
                        <ArrowRight className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Successful implementations */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                {content.implementations.eyebrow}
              </p>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {content.implementations.title}
              </h2>
              <p className="text-muted leading-relaxed">{content.implementations.intro}</p>
            </div>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image
                src={images.implementations}
                alt={content.implementations.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {content.implementations.highlights.map((item) => (
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

      {/* Implementation steps */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">{content.implementationStepsIntro.title}</h2>
            <p className="text-muted leading-relaxed">{content.implementationStepsIntro.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.implementationSteps.map((item) => (
              <div
                key={item.step}
                className="bg-card rounded-2xl p-6 border border-border text-center"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-subtle text-accent font-bold text-sm mb-4">
                  {item.step}
                </span>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-accent-subtle rounded-2xl p-8 lg:p-12 border border-accent/20 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to implement Enterprise Hub?
            </h3>
            <p className="text-muted max-w-xl mx-auto mb-6">
              Talk to us about your ERP requirements — we will walk you through
              customization options, timelines, and how we have delivered successful
              rollouts for organisations like yours.
            </p>
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
