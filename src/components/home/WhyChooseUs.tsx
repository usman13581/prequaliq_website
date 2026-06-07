"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, Users, Sparkles } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

const icons = [Award, Users, Sparkles];

export function WhyChooseUs() {
  const t = useTranslations();

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.home.whyChooseUs.eyebrow}
          title={t.home.whyChooseUs.title}
          description={t.home.whyChooseUs.description}
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {t.home.whyChooseUs.items.map((item, i) => {
            const Icon = icons[i] ?? Award;
            return (
              <div
                key={item.number}
                className="group bg-card rounded-2xl p-8 border border-border hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-accent-subtle text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-3xl font-bold text-border-strong group-hover:text-accent/30 transition-colors">
                    {item.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
