import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";
import { services, serviceDetails } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services
    .filter((s) => s.hasDetailPage)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return { title: service.title, description: service.shortDescription };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service || !service.hasDetailPage) notFound();

  const detail = serviceDetails[slug];

  return (
    <>
      <PageHero
        title={service.title}
        description={service.shortDescription}
        breadcrumb={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {detail ? (
            detail.sections.map((section) => (
              <div
                key={section.heading}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {section.heading}
                </h2>
                <p className="text-muted leading-relaxed mb-4">{section.content}</p>
                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div>
              <p className="text-muted leading-relaxed mb-8">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-accent-subtle rounded-2xl p-8 border border-accent/20 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Get Services Quote</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Button href="/contact" size="lg" icon>
                Request a Demo
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
