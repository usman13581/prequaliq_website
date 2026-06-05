import { oracleSection } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Code2, GraduationCap, Database, Smartphone } from "lucide-react";

const icons = [Code2, GraduationCap, Database, Smartphone];

export function OracleSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={oracleSection.subtitle}
          title={oracleSection.title}
          description={oracleSection.description}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {oracleSection.features.map((feature, i) => {
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
          <Button href="/services/oracle" icon>
            More Features
          </Button>
        </div>
      </div>
    </section>
  );
}
