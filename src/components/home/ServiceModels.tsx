import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type ServiceModel = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

type ServiceModelsProps = {
  eyebrow: string;
  title: string;
  description?: string;
  models: ServiceModel[];
};

export function ServiceModels({ eyebrow, title, description, models }: ServiceModelsProps) {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {models.map((model, i) => (
            <article
              key={model.title}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <span className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">{model.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-8 flex-1">{model.description}</p>

              <Link
                href={model.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent pt-5 border-t border-border"
              >
                {model.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
