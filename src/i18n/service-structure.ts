/** Static service structure — images, slugs, and hrefs (not locale-specific) */
export const serviceCategoryStructure = [
  {
    id: "applicationDevelopment" as const,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    slugs: ["web-and-mobile-apps", "custom-software", "ui-ux-design"] as const,
  },
  {
    id: "cloudIntegration" as const,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    slugs: ["cloud-solutions", "system-integration", "legacy-modernization"] as const,
  },
  {
    id: "intelligenceAutomation" as const,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    slugs: ["ai-solutions", "data-analytics"] as const,
  },
  {
    id: "partnershipSupport" as const,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    slugs: ["dedicated-teams", "it-consulting", "maintenance-support"] as const,
  },
];

export const serviceImages: Record<string, string> = {
  "web-and-mobile-apps":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  "custom-software":
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "ui-ux-design":
    "https://images.unsplash.com/photo-1561070791-36c117673299?auto=format&fit=crop&w=1200&q=80",
  "cloud-solutions":
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
  "system-integration":
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  "legacy-modernization":
    "https://images.unsplash.com/photo-1517694712202-14dd9538ac97?auto=format&fit=crop&w=1200&q=80",
  "ai-solutions":
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  "data-analytics":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "dedicated-teams":
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "it-consulting":
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  "maintenance-support":
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
};

export type ServiceSlug = keyof typeof serviceImages;

export const allServiceSlugs = Object.keys(serviceImages) as ServiceSlug[];
