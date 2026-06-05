import { SectionHeading } from "@/components/ui/SectionHeading";
import { Search, PenTool, Rocket, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We analyse your current systems, pain points, and business goals to define a clear roadmap.",
  },
  {
    icon: PenTool,
    title: "Design & Plan",
    description: "Our architects design a tailored solution with milestones, timelines, and measurable outcomes.",
  },
  {
    icon: Rocket,
    title: "Build & Deploy",
    description: "Agile delivery with continuous feedback — ensuring quality at every stage of implementation.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support & Scale",
    description: "Ongoing optimisation, training, and support to help your solution evolve with your business.",
  },
];

export function Process() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Process"
          title="From strategy to sustained success"
          description="A proven methodology that reduces risk, accelerates delivery, and ensures lasting value."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
              )}
              <div className="bg-card rounded-2xl p-6 border border-border h-full hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-accent uppercase tracking-widest">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
