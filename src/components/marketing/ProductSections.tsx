"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";

/**
 * Sections shared by the home page and the platform page: the procurement steps (navy),
 * AI help (white) and control points (navy). In that order they alternate with their neighbours.
 */

export function ProcessSteps() {
  const { locale } = useLanguage();
  const t = getProductSite(locale).process;

  return (
    <section className="section-dark pattern-diagonal py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">{t.eyebrow}</p>
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground max-w-3xl">
          {t.title}
        </h2>
        <p className="mt-4 text-muted max-w-2xl leading-relaxed">{t.description}</p>
        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {t.steps.map((step, i) => (
            <li key={step.title} className="border-t border-border pt-5">
              <span className="text-sm font-bold tabular-nums tracking-widest text-accent" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold text-foreground text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AiAssistance() {
  const { locale } = useLanguage();
  const t = getProductSite(locale).ai;

  return (
    <section className="section-light pattern-dots py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">{t.eyebrow}</p>
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground max-w-3xl">
          {t.title}
        </h2>
        <p className="mt-4 text-muted max-w-2xl leading-relaxed">{t.description}</p>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item) => (
            <article key={item.title} className="bg-card border border-border p-6">
              <Sparkles className="w-5 h-5 text-accent" aria-hidden />
              <h3 className="mt-3 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl border-l-2 border-accent pl-4 text-sm text-foreground/90 leading-relaxed">
          {t.note}
        </p>
      </div>
    </section>
  );
}

export function TrustPoints() {
  const { locale } = useLanguage();
  const t = getProductSite(locale).trust;

  return (
    <section className="section-dark pattern-rings py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8d5a3] mb-3">{t.eyebrow}</p>
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-white max-w-3xl">{t.title}</h2>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {t.items.map((item) => (
            <article key={item.title} className="border-t border-white/20 pt-5">
              <h3 className="font-semibold text-white text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
