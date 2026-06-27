"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

export function HomeProof() {
  const t = useTranslations();
  const proof = t.home.proof;

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-card border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="animate-fade-in-up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
              {proof.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-4">
              {proof.title}
            </h2>
            <p className="text-muted leading-relaxed max-w-xl">{proof.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 animate-stagger">
            {proof.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-surface p-5 sm:p-6 hover:border-accent/25 hover:shadow-md transition-all"
              >
                <p className="text-2xl sm:text-3xl font-bold text-foreground leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground/80">{stat.label}</p>
                {stat.hint && (
                  <p className="mt-1 text-xs text-muted leading-relaxed">{stat.hint}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-10 lg:mt-12 grid sm:grid-cols-3 gap-4 animate-stagger">
          {proof.outcomes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl bg-accent-subtle/60 border border-accent/15 px-4 py-4 text-sm text-foreground/85 leading-relaxed"
            >
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
