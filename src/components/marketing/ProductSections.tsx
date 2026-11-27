"use client";

import {
  BadgeCheck, EyeOff, FileCheck2, FilePenLine, FileSearch, Handshake, ListChecks, Lock, MessagesSquare, Megaphone,
  PackageCheck, Reply, Scale, ScanText, Send, ShieldCheck, Sparkles, Stamp, Trophy, UserCheck,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";

/**
 * Sections shared by the home page and the platform page: the procurement steps (navy),
 * AI help (white) and control points (navy). In that order they alternate with their neighbours.
 */

// One icon per entry, in the order of the texts in product-site.ts.
const STEP_ICONS: LucideIcon[] = [BadgeCheck, ListChecks, Send, MessagesSquare, Lock, Scale, Trophy, Handshake];
const AI_ICONS: LucideIcon[] = [FilePenLine, ScanText, FileCheck2, Reply, FileSearch, Megaphone];
const TRUST_ICONS: LucideIcon[] = [Lock, EyeOff, UserCheck, Stamp];

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
          {t.steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? PackageCheck;
            return (
              <li key={step.title} className="border-t border-border pt-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-accent">
                    <Icon className="w-5 h-5" aria-hidden />
                  </span>
                  <span className="text-sm font-bold tabular-nums tracking-widest text-accent" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-foreground text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{step.body}</p>
              </li>
            );
          })}
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
          {t.items.map((item, i) => {
            const Icon = AI_ICONS[i] ?? Sparkles;
            return (
              <article key={item.title} className="bg-card border border-border p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-subtle text-accent">
                  <Icon className="w-5 h-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
              </article>
            );
          })}
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
          {t.items.map((item, i) => {
            const Icon = TRUST_ICONS[i] ?? ShieldCheck;
            return (
              <article key={item.title} className="border-t border-white/20 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#e8d5a3]">
                  <Icon className="w-5 h-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-semibold text-white text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
