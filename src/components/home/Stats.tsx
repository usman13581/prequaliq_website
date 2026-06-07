"use client";

import { useTranslations } from "@/i18n/LanguageProvider";

export function Stats() {
  const t = useTranslations();

  return (
    <section className="relative py-20 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto mb-16">
          {t.home.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {t.home.oracleSection.trustedUser.headline}
          </h2>
          <div className="inline-flex items-center gap-4 bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white font-bold">
              HT
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">{t.home.oracleSection.trustedUser.name}</p>
              <p className="text-sm text-slate-400">{t.home.oracleSection.trustedUser.company}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
