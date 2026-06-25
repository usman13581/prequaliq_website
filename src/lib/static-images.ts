/** Local static image paths — served from /static_resources (synced from repo root). */
const base = "/static_resources/images";

export const backgroundImages = {
  homeHero: `${base}/backgrounds/home-hero.jpg`,
  pageHero: `${base}/backgrounds/page-hero.jpg`,
  contact: `${base}/backgrounds/contact.jpg`,
  team: `${base}/backgrounds/team.jpg`,
  expertise: `${base}/backgrounds/expertise.jpg`,
  ctaBand: `${base}/backgrounds/cta-band.jpg`,
  process: `${base}/backgrounds/process.jpg`,
} as const;

export const expertiseImages: Record<string, string> = {
  "oracle-cloud-applications": `${base}/expertise/oracle-cloud-applications.jpg`,
  "microsoft-dotnet": `${base}/expertise/microsoft-dotnet.jpg`,
  "ruby-on-rails": `${base}/expertise/ruby-on-rails.jpg`,
  salesforce: `${base}/expertise/salesforce.jpg`,
  "web-mobile-applications": `${base}/expertise/web-mobile-applications.jpg`,
  "cloud-integration-apis": `${base}/expertise/cloud-integration-apis.jpg`,
  "data-analytics-automation": `${base}/expertise/data-analytics-automation.jpg`,
  "business-it-consulting": `${base}/expertise/business-it-consulting.jpg`,
};

export function getExpertiseImage(slug: string): string | undefined {
  return expertiseImages[slug];
}

export const serviceCategoryImages = {
  applicationDevelopment: `${base}/services/categories/application-development.jpg`,
  cloudIntegration: `${base}/services/categories/cloud-integration.jpg`,
  intelligenceAutomation: `${base}/services/categories/intelligence-automation.jpg`,
  partnershipSupport: `${base}/services/categories/partnership-support.jpg`,
} as const;

export const serviceImages: Record<string, string> = {
  "web-and-mobile-apps": `${base}/services/web-and-mobile-apps.jpg`,
  "custom-software": `${base}/services/custom-software.jpg`,
  "ui-ux-design": `${base}/services/ui-ux-design.jpg`,
  "cloud-solutions": `${base}/services/cloud-solutions.jpg`,
  "system-integration": `${base}/services/system-integration.jpg`,
  "legacy-modernization": `${base}/services/legacy-modernization.jpg`,
  "ai-solutions": `${base}/services/ai-solutions.jpg`,
  "data-analytics": `${base}/services/data-analytics.jpg`,
  "dedicated-teams": `${base}/services/dedicated-teams.jpg`,
  "it-consulting": `${base}/services/it-consulting.jpg`,
  "maintenance-support": `${base}/services/maintenance-support.jpg`,
};

export const prequaliqAppsImages = {
  hero: `${base}/products/prequaliq-apps/hero.jpg`,
  swedenFocus: `${base}/products/prequaliq-apps/sweden-focus.jpg`,
  qualification: `${base}/products/prequaliq-apps/qualification.jpg`,
  implementation: `${base}/products/prequaliq-apps/implementation.jpg`,
  audience: [
    `${base}/products/shared/meeting-collaboration.jpg`,
    `${base}/products/prequaliq-apps/audience-suppliers.jpg`,
  ],
  features: [
    `${base}/services/categories/intelligence-automation.jpg`,
    `${base}/products/shared/analytics-dashboard.jpg`,
    `${base}/products/enterprise-hub/hero.jpg`,
    `${base}/products/shared/compliance-documents.jpg`,
  ],
  screenshots: [
    `${base}/services/categories/intelligence-automation.jpg`,
    `${base}/products/shared/office-workspace.jpg`,
    `${base}/products/prequaliq-apps/screenshot-search.jpg`,
    `${base}/products/shared/compliance-documents.jpg`,
  ],
};

export const enterpriseHubImages = {
  hero: `${base}/products/enterprise-hub/hero.jpg`,
  readyForImplementation: `${base}/products/shared/meeting-collaboration.jpg`,
  implementations: `${base}/products/enterprise-hub/implementations.jpg`,
  modules: [
    `${base}/products/enterprise-hub/module-finance.jpg`,
    `${base}/products/enterprise-hub/module-sales.jpg`,
    `${base}/products/enterprise-hub/module-procurement.jpg`,
    `${base}/products/enterprise-hub/module-inventory.jpg`,
    `${base}/products/enterprise-hub/module-hr.jpg`,
    `${base}/services/categories/intelligence-automation.jpg`,
  ],
  screenshots: [
    `${base}/services/categories/intelligence-automation.jpg`,
    `${base}/products/shared/office-workspace.jpg`,
    `${base}/products/enterprise-hub/screenshot-warehouse.jpg`,
    `${base}/products/shared/compliance-documents.jpg`,
  ],
};

export type ServiceSlug = keyof typeof serviceImages;

export const allServiceSlugs = Object.keys(serviceImages) as ServiceSlug[];
