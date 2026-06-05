import { Quote } from "lucide-react";

export function Testimonial() {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Quote className="w-10 h-10 text-accent/30 mx-auto mb-8" />
        <blockquote className="text-2xl md:text-3xl text-foreground leading-normal font-semibold">
          &ldquo;PrequaliQ transformed our operations with a seamless Oracle APEX implementation.
          Their team&apos;s expertise and dedication exceeded every expectation.&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            HT
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">Hanri Thomas</p>
            <p className="text-sm text-muted">Consultancy Agency</p>
          </div>
        </div>
      </div>
    </section>
  );
}
