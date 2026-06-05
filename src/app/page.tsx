import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { ServiceCard } from "@/components/home/ServiceCard";
import { ProductCard } from "@/components/home/ProductCard";
import { Stats } from "@/components/home/Stats";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { OracleSection } from "@/components/home/OracleSection";
import { ManagementSection } from "@/components/home/ManagementSection";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { CTA } from "@/components/home/CTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services, products, values, whoWeAre, whatWeOffer } from "@/lib/site-data";
import { Target, Compass } from "lucide-react";

const valueIcons = [Target, Compass];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={whatWeOffer.title}
            title="Comprehensive solutions across leading platforms"
            description={whatWeOffer.description}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Products"
            title="Innovative platforms built for your business"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.slug} {...product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow={whoWeAre.title}
                title="Dedicated professionals, lasting partnerships"
                description={whoWeAre.description}
                align="left"
                className="mb-8"
              />
              <Button href="/team" icon>
                Meet The Team
              </Button>
            </div>

            <div className="grid gap-5">
              {values.map((value, i) => {
                const Icon = valueIcons[i] ?? Target;
                return (
                  <div
                    key={value.title}
                    className="flex gap-5 bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-accent-subtle text-accent flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1.5">
                        {value.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Stats />
      <OracleSection />
      <ManagementSection />
      <FeaturedServices />
      <CTA />
    </>
  );
}
