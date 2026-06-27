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
    <section className="relative py-20 sm:py-24 lg:py-32 bg-surface-dark text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-primary to-primary-mid pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 right-0 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} light />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {models.map((model) => (
            <article
              key={model.title}
              className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-white/[0.06] backdrop-blur-sm flex flex-col h-full hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{model.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-1">{model.description}</p>

              <Link
                href={model.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white pt-5 border-t border-white/10 transition-colors"
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
