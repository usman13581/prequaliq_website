import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/home/ProductCard";
import { CTA } from "@/components/home/CTA";
import { products } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Explore PrequaliQ's product suite — PrequaliQ App, ERP System, and AI Command Center.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Products built for enterprise scale"
        description="Purpose-built platforms that streamline operations, accelerate decisions, and unlock the full potential of your data."
        breadcrumb={[{ label: "Products" }]}
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.slug} {...product} index={i} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
