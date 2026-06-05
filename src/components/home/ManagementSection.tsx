import { managementSection } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Shield, Code } from "lucide-react";

const icons = [Shield, Code];

export function ManagementSection() {
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={managementSection.title}
          description={managementSection.description}
        />

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {managementSection.features.map((feature, i) => {
            const Icon = icons[i] ?? Shield;
            return (
              <div
                key={feature.title}
                className="flex gap-5 bg-card rounded-2xl p-6 border border-border"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button href="/contact" icon>
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
