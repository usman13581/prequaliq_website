import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-dark text-white">
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-snug tracking-tight">
            {siteConfig.name}{" "}
            <span className="text-gradient">{siteConfig.tagline}</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="white" size="lg" icon>
              Get Started
            </Button>
            <Button
              href="/services"
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 border border-white/20"
            >
              Discover More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {["Salesforce", "Oracle", "NetSuite", "Ruby on Rails"].map((tech) => (
              <div key={tech} className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
