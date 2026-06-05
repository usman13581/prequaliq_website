import Link from "next/link";
import { ArrowUpRight, Cloud, Database, Code2, Layers } from "lucide-react";

type ServiceCardProps = {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  hasDetailPage?: boolean;
};

const icons: Record<string, React.ElementType> = {
  cloud: Cloud,
  database: Database,
  code: Code2,
  layers: Layers,
};

export function ServiceCard({
  slug,
  title,
  shortDescription,
  icon,
  hasDetailPage = true,
}: ServiceCardProps) {
  const Icon = icons[icon] ?? Cloud;
  const href = hasDetailPage ? `/services/${slug}` : "/contact";

  return (
    <Link
      href={href}
      className="group card-shine relative bg-card rounded-2xl p-7 border border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="h-12 w-12 rounded-2xl bg-accent-subtle text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-light group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed flex-1">{shortDescription}</p>

      <div className="mt-6 pt-5 border-t border-border">
        <span className="text-sm font-semibold text-accent">
          {hasDetailPage ? "View capabilities →" : "Contact us →"}
        </span>
      </div>
    </Link>
  );
}
