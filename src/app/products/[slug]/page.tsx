import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/home/CTA";
import { products } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products
    .filter((p) => !["enterprise-hub", "prequaliq-apps"].includes(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return { title: product.title, description: product.shortDescription };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        title={product.title}
        description={product.shortDescription}
        breadcrumb={[
          { label: "Products", href: "/products" },
          { label: product.title },
        ]}
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl">
            <p className="text-muted leading-relaxed text-base">{product.description}</p>
          </div>

          {product.sections?.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
              <p className="text-muted leading-relaxed">{section.content}</p>
            </div>
          ))}

          {"featureDetails" in product && product.featureDetails && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Key Features</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {product.featureDetails.map((group) => (
                  <div
                    key={group.title}
                    className="bg-card rounded-2xl p-6 border border-border"
                  >
                    <h3 className="font-bold text-foreground mb-4">{group.title}</h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-accent-subtle rounded-2xl p-8 border border-accent/20 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Get a Personalized Demo</h3>
            <Button href="/contact" size="lg" icon className="mt-4">
              Request a Demo
            </Button>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
