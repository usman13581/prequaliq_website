"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";
import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { prequaliqAppsImages } from "@/lib/static-images";

export function ProductHome() {
  const { locale } = useLanguage();
  const t = getProductSite(locale);
  const { openContactModal } = useContactModal();

  return (
    <>
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <Image
          src={prequaliqAppsImages.hero}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#06261f]/95 via-[#0a3d32]/88 to-[#0f2744]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_55%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8d5a3] mb-5">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight max-w-4xl leading-[1.1]">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-lg text-white/85 max-w-2xl leading-relaxed">
            {t.hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/buyers" size="lg" variant="white" icon>
              {t.hero.ctaBuyer}
            </Button>
            <Button
              href="/suppliers"
              size="lg"
              className="bg-transparent border border-white/40 text-white hover:bg-white/10"
              icon
            >
              {t.hero.ctaSupplier}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            {t.preferred.eyebrow}
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground max-w-3xl">
            {t.preferred.title}
          </h2>
          <p className="mt-4 text-muted max-w-2xl leading-relaxed">{t.preferred.description}</p>
          <div className="mt-14 grid sm:grid-cols-3 gap-8">
            {t.preferred.stats.map((stat) => (
              <div key={stat.value} className="border-t border-border pt-6">
                <p className="font-display text-2xl text-foreground font-semibold">{stat.value}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                {t.network.eyebrow}
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">
                {t.network.title}
              </h2>
              <p className="mt-4 text-muted leading-relaxed">{t.network.description}</p>
              <ul className="mt-8 space-y-4">
                {t.network.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={prequaliqAppsImages.swedenFocus}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            {t.features.eyebrow}
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground max-w-3xl">
            {t.features.title}
          </h2>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {t.features.items.map((item) => (
              <article key={item.title}>
                <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            {t.audiences.eyebrow}
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground max-w-3xl mb-12">
            {t.audiences.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {[t.audiences.buyers, t.audiences.suppliers].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block bg-card border border-border p-8 lg:p-10 hover:border-accent/40 transition-colors"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  {card.subtitle}
                </p>
                <h3 className="font-display text-2xl font-semibold text-foreground">{card.title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{card.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  {card.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3 text-center">
            {t.faq.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold text-foreground text-center mb-12">
            {t.faq.title}
          </h2>
          <div className="space-y-4">
            {t.faq.items.map((item) => (
              <details
                key={item.q}
                className="group border border-border bg-card open:border-accent/30"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-foreground flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-muted text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06261f] via-[#0a3d32] to-[#0f2744]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-white">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-white/80 leading-relaxed">{t.cta.description}</p>
          <div className="mt-8">
            <Button variant="white" size="lg" icon onClick={() => openContactModal()}>
              {t.cta.button}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
