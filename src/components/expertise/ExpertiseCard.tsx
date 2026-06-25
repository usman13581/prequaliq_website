import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export type ExpertiseCardProps = {
  slug: string;
  title: string;
  shortDescription: string;
  image?: string;
  stackPreview?: string[];
  learnMoreLabel?: string;
};

export function ExpertiseCard({
  slug,
  title,
  shortDescription,
  image,
  stackPreview = [],
  learnMoreLabel = "Learn more",
}: ExpertiseCardProps) {
  return (
    <Link
      href={`/expertise/${slug}`}
      className="group card-shine relative bg-card rounded-2xl border border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 flex flex-col h-full min-h-[200px] overflow-hidden"
    >
      {image && (
        <div className="relative h-32 sm:h-36 overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            sizes="(max-width: 640px) 100vw, 25vw"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />
        </div>
      )}

      <div className={`flex flex-col flex-1 ${image ? "p-5 sm:p-6" : "p-5 sm:p-6 lg:p-7"}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-muted-light group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-0.5" />
        </div>
        <p className="text-muted text-sm leading-relaxed flex-1 line-clamp-3">{shortDescription}</p>

        {stackPreview.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            {stackPreview.map((stack) => (
              <li
                key={stack}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-surface text-foreground/70 border border-border"
              >
                {stack}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 pt-4 border-t border-border">
          <span className="text-sm font-semibold text-accent">{learnMoreLabel} →</span>
        </div>
      </div>
    </Link>
  );
}
