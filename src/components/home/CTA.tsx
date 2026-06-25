"use client";

import { Button } from "@/components/ui/Button";
import { AnimatedSectionBg } from "@/components/ui/AnimatedSectionBg";
import { backgroundImages } from "@/lib/static-images";
import { useTranslations } from "@/i18n/LanguageProvider";

export function CTA() {
  const t = useTranslations();

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[280px]">
          <AnimatedSectionBg src={backgroundImages.ctaBand} overlay={78} animate="drift" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary-mid/70 to-accent/60 animate-gradient-shift pointer-events-none" />

          <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center animate-fade-in-up">
            <h2 className="text-3xl lg:text-4xl text-white font-bold leading-snug mb-4">
              {t.home.cta.title}
            </h2>
            <p className="text-slate-200 text-lg max-w-2xl mx-auto mb-8">{t.home.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="white" size="lg" icon>
                {t.home.cta.requestDemo}
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 shadow-none"
              >
                {t.home.cta.getServicesQuote}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
