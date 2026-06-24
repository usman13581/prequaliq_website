import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type CompactProduct = {
  slug: string;
  title: string;
  shortDescription: string;
};

type ProductsCompactProps = {
  eyebrow: string;
  title: string;
  description?: string;
  products: CompactProduct[];
  viewAllHref?: string;
  viewAllLabel?: string;
  exploreLabel?: string;
};

const gradients = [
  "from-primary to-primary-mid",
  "from-[#1e3a5f] to-[#2563eb]",
];

export function ProductsCompact({
  eyebrow,
  title,
  description,
  products,
  viewAllHref = "/products",
  viewAllLabel = "View all products",
  exploreLabel = "Explore product",
}: ProductsCompactProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="left"
            className="mb-0"
          />
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-accent hover:text-accent-hover flex items-center gap-1 flex-shrink-0"
          >
            {viewAllLabel}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-4xl">
          {products.map((product, i) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} p-6 sm:p-7 text-white min-h-[180px] sm:min-h-[200px] flex flex-col justify-between hover:shadow-xl hover:shadow-primary/20 transition-all duration-300`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg sm:text-xl font-bold">{product.title}</h3>
                  <ArrowUpRight className="w-5 h-5 text-white/60 group-hover:text-white flex-shrink-0 transition-colors" />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mt-2 line-clamp-2">
                  {product.shortDescription}
                </p>
              </div>
              <span className="text-sm font-semibold text-blue-200 mt-4">{exploreLabel} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
