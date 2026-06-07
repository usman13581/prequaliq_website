"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Code2, GraduationCap, Database, Smartphone } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

const icons = [Code2, GraduationCap, Database, Smartphone];

export function OracleSection() {
  const t = useTranslations();
  const section = t.home.oracleSection;

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={section.subtitle}
          title={section.title}
          description={section.description}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {section.features.map((feature, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
              >
                <div className="h-11 w-11 rounded-xl bg-accent-subtle text-accent flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button href="/services" icon>
            {section.exploreServices}
          </Button>
        </div>
      </div>
    </section>
  );
}
