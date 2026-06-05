import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProductCardProps = {
  slug: string;
  title: string;
  shortDescription: string;
  index?: number;
};

const gradients = [
  "from-primary to-primary-mid",
  "from-[#1e3a5f] to-[#2563eb]",
  "from-[#0f2744] to-[#1d4ed8]",
];

export function ProductCard({ slug, title, shortDescription, index = 0 }: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} p-8 text-white min-h-[280px] flex flex-col justify-between hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1`}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50">
            Product
          </span>
          <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <h3 className="text-2xl font-bold mt-4 mb-3">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{shortDescription}</p>
      </div>

      <span className="relative inline-flex items-center gap-1 text-sm font-semibold text-blue-200 group-hover:gap-2 transition-all mt-6">
        Explore product
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
