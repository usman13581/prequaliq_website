"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { backgroundImages } from "@/lib/static-images";

export function Hero() {
  const t = useTranslations();
  const { openContactModal } = useContactModal();

  return (
    <section className="relative overflow-hidden bg-surface-dark text-white min-h-[520px] lg:min-h-[600px]">
      <Image
        src={backgroundImages.homeHero}
        alt=""
        fill
        priority
        className="object-cover scale-105 animate-hero-bg pointer-events-none"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/90 to-surface-dark/60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-float-slow pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-snug tracking-tight">
            {t.site.name}{" "}
            <span className="text-gradient">{t.site.tagline}</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
            {t.site.description}
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap gap-4">
            <Button variant="white" size="lg" icon onClick={openContactModal}>
              {t.common.getStarted}
            </Button>
            <Button
              href="/expertise"
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 border border-white/20"
            >
              {t.nav.expertise}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {t.home.hero.pills.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-slate-400 animate-fade-in-up"
                style={{ animationDelay: `${0.15 * i}s` }}
              >
                <CheckCircle2 className="w-4 h-4 text-accent" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
