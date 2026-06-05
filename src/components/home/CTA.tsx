import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-mid to-accent" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
            <h2 className="text-3xl lg:text-4xl text-white font-bold leading-snug mb-4">
              Ready To Improve Your Experience With PrequaliQ?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Get a personalized demo or services quote from our expert team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="white" size="lg" icon>
                Request a Demo
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 shadow-none"
              >
                Get Services Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
