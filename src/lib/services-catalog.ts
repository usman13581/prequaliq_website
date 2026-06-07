export type ServiceMenuItem = {
  label: string;
  description: string;
  href: string;
};

export type ServiceMenuCategory = {
  title: string;
  description: string;
  image: string;
  items: ServiceMenuItem[];
};

export type CatalogService = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  category: string;
  image: string;
};

/** Compact, generic services menu — outcome-focused, not technology-specific */
export const serviceMenuCategories: ServiceMenuCategory[] = [
  {
    title: "Application Development",
    description: "Software built around your business goals",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    items: [
      {
        label: "Web & Mobile Applications",
        description: "Portals, apps, and digital products for any device",
        href: "/services/web-and-mobile-apps",
      },
      {
        label: "Custom Software Solutions",
        description: "Tailored systems for your unique workflows",
        href: "/services/custom-software",
      },
      {
        label: "UI/UX Design",
        description: "Interfaces that are clear, usable, and on-brand",
        href: "/services/ui-ux-design",
      },
    ],
  },
  {
    title: "Cloud & Integration",
    description: "Connect, migrate, and modernise your systems",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    items: [
      {
        label: "Cloud Solutions",
        description: "Migration, hosting, and cloud-native applications",
        href: "/services/cloud-solutions",
      },
      {
        label: "System Integration",
        description: "Unify tools, data, and workflows across your organisation",
        href: "/services/system-integration",
      },
      {
        label: "Legacy Modernization",
        description: "Upgrade outdated systems with minimal disruption",
        href: "/services/legacy-modernization",
      },
    ],
  },
  {
    title: "Intelligence & Automation",
    description: "Smarter decisions and automated processes",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    items: [
      {
        label: "AI-Powered Solutions",
        description: "Intelligent features embedded in your applications",
        href: "/services/ai-solutions",
      },
      {
        label: "Data & Analytics",
        description: "Reliable data, reporting, and actionable insights",
        href: "/services/data-analytics",
      },
    ],
  },
  {
    title: "Partnership & Support",
    description: "People and ongoing care for your technology",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    items: [
      {
        label: "Dedicated Teams",
        description: "Experts working as an extension of your organisation",
        href: "/services/dedicated-teams",
      },
      {
        label: "IT Consulting",
        description: "Strategy, roadmaps, and technical guidance",
        href: "/services/it-consulting",
      },
      {
        label: "Maintenance & Support",
        description: "Keep your applications secure, stable, and up to date",
        href: "/services/maintenance-support",
      },
    ],
  },
];

export const catalogServices: CatalogService[] = [
  {
    slug: "web-and-mobile-apps",
    title: "Web & Mobile Applications",
    category: "Application Development",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Digital products for web and mobile — built to scale with your business.",
    description:
      "We design and develop web and mobile applications that help organisations serve customers, empower teams, and run operations more efficiently. From customer portals to internal tools, we deliver secure, performant software aligned with your business objectives.",
    features: [
      "Enterprise websites and customer portals",
      "Native and cross-platform mobile apps",
      "Progressive web applications",
      "End-to-end design, build, and launch support",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software Solutions",
    category: "Application Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Bespoke software engineered for how your organisation actually works.",
    description:
      "When standard products do not fit, we build custom software tailored to your processes, integrations, and growth plans — from initial concept through to long-term evolution.",
    features: [
      "Requirements discovery and solution design",
      "Custom application development",
      "Workflow automation",
      "Scalable architecture for future needs",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "Application Development",
    image:
      "https://images.unsplash.com/photo-1561070791-36c117673299?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "User-centred design for web and mobile products.",
    description:
      "Our designers create interfaces that balance aesthetics with usability — helping users complete tasks quickly while reinforcing your brand and business goals.",
    features: [
      "User research and journey mapping",
      "Wireframes and interactive prototypes",
      "Visual design and design systems",
      "Usability testing and refinement",
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    category: "Cloud & Integration",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Cloud migration, development, and managed operations.",
    description:
      "We help organisations move to the cloud and build cloud-native applications — with careful planning, secure migration, and ongoing optimisation for performance and cost.",
    features: [
      "Cloud readiness assessment",
      "Migration planning and execution",
      "Cloud-native application development",
      "Monitoring and managed operations",
    ],
  },
  {
    slug: "system-integration",
    title: "System Integration",
    category: "Cloud & Integration",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Connect applications, data, and third-party services seamlessly.",
    description:
      "We integrate disparate systems so data flows reliably across your organisation — reducing manual work, improving visibility, and enabling better decisions.",
    features: [
      "API design and development",
      "Third-party service integration",
      "Data synchronisation",
      "Integration testing and documentation",
    ],
  },
  {
    slug: "legacy-modernization",
    title: "Legacy Modernization",
    category: "Cloud & Integration",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538ac97?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Modernise ageing systems without stopping the business.",
    description:
      "We upgrade legacy applications through phased modernisation — improving security, performance, and maintainability while managing risk and continuity.",
    features: [
      "System assessment and roadmap",
      "Application re-engineering",
      "Incremental migration strategies",
      "Knowledge transfer and documentation",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI-Powered Solutions",
    category: "Intelligence & Automation",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Practical AI integrated into your products and processes.",
    description:
      "We help organisations adopt AI where it adds real value — from intelligent automation and assistants to smarter workflows embedded in existing applications.",
    features: [
      "AI feature discovery and prototyping",
      "Intelligent automation",
      "Natural language interfaces",
      "Pilot projects with measurable outcomes",
    ],
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    category: "Intelligence & Automation",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Turn your data into clarity and confident decisions.",
    description:
      "We design data solutions that improve accuracy, accessibility, and insight — from database architecture to cleansing, reporting, and analytics dashboards.",
    features: [
      "Database design and optimisation",
      "Data cleansing and governance",
      "Reporting and dashboard development",
      "Analytics strategy and implementation",
    ],
  },
  {
    slug: "dedicated-teams",
    title: "Dedicated Teams",
    category: "Partnership & Support",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "A committed team aligned with your product and timeline.",
    description:
      "Scale delivery with a dedicated team of developers, designers, and engineers who work closely with you — transparent communication, agile delivery, and shared accountability.",
    features: [
      "Full-stack dedicated teams",
      "Flexible team composition",
      "Agile sprint-based delivery",
      "Long-term product partnership",
    ],
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    category: "Partnership & Support",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Expert guidance from strategy through execution.",
    description:
      "Our consultants help you define technology direction, evaluate options, and plan implementations — ensuring investments align with business priorities and deliver measurable results.",
    features: [
      "Technology strategy and roadmaps",
      "Solution architecture",
      "Vendor and platform evaluation",
      "Digital transformation planning",
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    category: "Partnership & Support",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Proactive care to keep your systems running smoothly.",
    description:
      "We provide ongoing maintenance and support — security updates, performance tuning, bug fixes, and enhancements — so your applications stay reliable as your needs evolve.",
    features: [
      "Application monitoring and support",
      "Security patches and updates",
      "Performance optimisation",
      "SLA-driven response times",
    ],
  },
];

export function categoryToId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}

export function getAllServiceSlugs(): string[] {
  return catalogServices.map((s) => s.slug);
}

export function getCatalogService(slug: string): CatalogService | undefined {
  return catalogServices.find((s) => s.slug === slug);
}

export function getCatalogServiceByHref(href: string): CatalogService | undefined {
  const slug = href.replace("/services/", "");
  return getCatalogService(slug);
}

export function getRelatedServices(slug: string, limit = 3): CatalogService[] {
  const current = getCatalogService(slug);
  if (!current) return [];
  return catalogServices
    .filter((s) => s.category === current.category && s.slug !== slug)
    .slice(0, limit);
}
