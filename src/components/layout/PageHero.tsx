import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PageHeroProps = {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
};

export function PageHero({ title, description, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative bg-surface-dark text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {breadcrumb && (
          <nav className="flex items-center gap-1 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href && i < breadcrumb.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-300">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-snug max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
