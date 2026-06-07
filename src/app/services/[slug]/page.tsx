import { allServiceSlugs } from "@/i18n/service-structure";
import { ServiceDetailContent } from "@/components/services/ServiceDetailContent";

export function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export default function ServiceDetailPage() {
  return <ServiceDetailContent />;
}
