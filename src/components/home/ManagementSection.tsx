"use client";

import { Button } from "@/components/ui/Button";
import { useTranslations } from "@/i18n/LanguageProvider";

export function ManagementSection() {
  const t = useTranslations();
  const section = t.home.managementSection;

  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">{section.title}</h2>
          <p className="text-muted leading-relaxed">{section.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {section.features.map((feature) => (
            <div key={feature.title} className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/contact" icon>
            {section.contactUs}
          </Button>
        </div>
      </div>
    </section>
  );
}
