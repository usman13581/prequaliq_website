/** Static service structure — images, slugs, and hrefs (not locale-specific) */
import { serviceCategoryImages, serviceImages, type ServiceSlug } from "@/lib/static-images";

export { serviceImages, type ServiceSlug };

export const serviceCategoryStructure = [
  {
    id: "applicationDevelopment" as const,
    image: serviceCategoryImages.applicationDevelopment,
    slugs: ["web-and-mobile-apps", "custom-software", "ui-ux-design"] as const,
  },
  {
    id: "cloudIntegration" as const,
    image: serviceCategoryImages.cloudIntegration,
    slugs: ["cloud-solutions", "system-integration", "legacy-modernization"] as const,
  },
  {
    id: "intelligenceAutomation" as const,
    image: serviceCategoryImages.intelligenceAutomation,
    slugs: ["ai-solutions", "data-analytics"] as const,
  },
  {
    id: "partnershipSupport" as const,
    image: serviceCategoryImages.partnershipSupport,
    slugs: ["dedicated-teams", "it-consulting", "maintenance-support"] as const,
  },
];

export const allServiceSlugs = Object.keys(serviceImages) as ServiceSlug[];
