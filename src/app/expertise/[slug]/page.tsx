import { expertiseSlugs } from "@/lib/expertise-structure";
import { ExpertiseDetailContent } from "@/components/expertise/ExpertiseDetailContent";

export function generateStaticParams() {
  return expertiseSlugs.map((slug) => ({ slug }));
}

export default function ExpertiseDetailPage() {
  return <ExpertiseDetailContent />;
}
