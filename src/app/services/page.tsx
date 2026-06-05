import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceCard } from "@/components/home/ServiceCard";
import { CTA } from "@/components/home/CTA";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Salesforce, Oracle, NetSuite, and Ruby on Rails consulting and development services from PrequaliQ.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Expert services across leading platforms"
        description="From strategy and implementation to ongoing support — we deliver end-to-end solutions tailored to your business."
        breadcrumb={[{ label: "Services" }]}
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
