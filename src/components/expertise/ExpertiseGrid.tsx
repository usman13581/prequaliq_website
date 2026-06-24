import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ExpertiseCard, type ExpertiseCardProps } from "./ExpertiseCard";

type ExpertiseGridProps = {
  eyebrow: string;
  title: string;
  description?: string;
  viewAllLabel: string;
  learnMoreLabel: string;
  items: ExpertiseCardProps[];
};

export function ExpertiseGrid({
  eyebrow,
  title,
  description,
  viewAllLabel,
  learnMoreLabel,
  items,
}: ExpertiseGridProps) {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="expertise-grid-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 animate-stagger">
          {items.map((item) => (
            <ExpertiseCard key={item.slug} {...item} learnMoreLabel={learnMoreLabel} />
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Button href="/expertise" variant="outline" size="md">
            {viewAllLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
