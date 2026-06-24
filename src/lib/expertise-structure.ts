export const expertiseSlugs = [
  "oracle-cloud-applications",
  "microsoft-dotnet",
  "ruby-on-rails",
  "salesforce",
  "web-mobile-applications",
  "cloud-integration-apis",
  "data-analytics-automation",
  "business-it-consulting",
] as const;

export type ExpertiseSlug = (typeof expertiseSlugs)[number];

export function isExpertiseSlug(slug: string): slug is ExpertiseSlug {
  return (expertiseSlugs as readonly string[]).includes(slug);
}
