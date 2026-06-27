"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroRotatingWords } from "@/components/home/HeroRotatingWords";
import { useTranslations } from "@/i18n/LanguageProvider";
import { useProjectModal } from "@/components/project/ProjectModalProvider";
import { backgroundImages } from "@/lib/static-images";

function HeroReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`hero-reveal ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const t = useTranslations();
  const hero = t.home.hero;
  const { openProjectModal } = useProjectModal();
  const marqueeItems = [...hero.marquee, ...hero.marquee];

  return (
    <section className="relative overflow-hidden bg-surface-dark text-white min-h-[580px] lg:min-h-[700px] flex flex-col">
      <Image
        src={backgroundImages.homeHero}
        alt=""
        fill
        priority
        className="object-cover scale-105 animate-hero-bg pointer-events-none"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-surface-dark/92 to-primary/80 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[min(90vw,800px)] h-[min(90vw,800px)] bg-accent/25 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-mid/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 animate-float-slow pointer-events-none" />

      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 lg:pt-20 lg:pb-12 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-end">
          <div className="max-w-3xl">
            <HeroReveal delay={0}>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" aria-hidden />
                {hero.eyebrow}
              </p>
            </HeroReveal>

            <HeroReveal delay={80} className="mt-5">
              <p className="text-sm sm:text-base font-medium text-blue-200/90 tracking-wide">
                {hero.kicker}
              </p>
            </HeroReveal>

            <HeroReveal delay={160} className="mt-4">
              <h1 className="text-[2.2rem] sm:text-5xl lg:text-[3.35rem] font-bold leading-[1.1] tracking-tight">
                <span className="block text-white">{hero.title}</span>
                <span className="block mt-2 sm:mt-3 min-h-[1.2em]">
                  <HeroRotatingWords words={hero.rotatingWords} />
                </span>
              </h1>
            </HeroReveal>

            <HeroReveal delay={260} className="mt-6">
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                {hero.description}
              </p>
            </HeroReveal>

            <HeroReveal delay={360} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Button variant="white" size="lg" icon onClick={openProjectModal}>
                {hero.primaryCta}
              </Button>
              <Button
                href="/services"
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 border border-white/20"
              >
                {hero.secondaryCta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </HeroReveal>
          </div>

          <HeroReveal delay={420} className="lg:pb-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 sm:py-5 backdrop-blur-sm hover:bg-white/[0.08] transition-colors"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-white leading-none">{stat.value}</p>
                  <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-200">{stat.label}</p>
                  {stat.hint && (
                    <p className="mt-1 text-[10px] sm:text-xs text-slate-400 leading-snug">{stat.hint}</p>
                  )}
                </div>
              ))}
            </div>
          </HeroReveal>
        </div>

        <HeroReveal delay={560} className="mt-10 lg:mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                {hero.flowLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {hero.flowSteps.map((step, i) => (
                  <span
                    key={step}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="font-mono text-[10px] text-accent/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                    {i < hero.flowSteps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-white/30 hidden sm:inline" aria-hidden />
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative py-3 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface-dark/90 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface-dark/90 to-transparent z-10 pointer-events-none" />
              <div className="flex animate-marquee whitespace-nowrap">
                {marqueeItems.map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="mx-5 sm:mx-8 text-sm font-semibold text-white/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </HeroReveal>
      </div>
    </section>
  );
}
