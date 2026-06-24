"use client";

import { Search, Users, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslations } from "@/i18n/LanguageProvider";

const stepIcons = [Search, Users, Rocket];

export function Process() {
  const t = useTranslations();
  const { howWeWork } = t.home;

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={howWeWork.eyebrow}
          title={howWeWork.title}
          description={howWeWork.description}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
          {howWeWork.steps.map((step, i) => {
            const Icon = stepIcons[i] ?? Search;
            return (
              <div key={step.title} className="relative">
                {i < howWeWork.steps.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
                )}
                <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border h-full hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-accent uppercase tracking-widest">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
