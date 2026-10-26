export type PrequaliqAudience = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  benefits: string[];
};

export type PrequaliqFeature = {
  title: string;
  description: string;
  image: string;
};

export type PrequaliqScreenshot = {
  title: string;
  caption: string;
  image: string;
};

/** Fallback / reference copy — live product page uses i18n locales. */
export const prequaliqAppsContent = {
  title: "E-Procurement system",
  pageTitle: "Prequaliq - E-Procurement system",
  tagline:
    "A complete e-procurement system with built-in AI for Swedish authorities, municipalities and regions",
  shortDescription:
    "Prequaliq Apps is a complete e-procurement system with built-in AI functions. It is used in the Swedish public sector to manage the full procurement process — from market research to signing contracts.",
  heroImage:
    "https://images.unsplash.com/photo-1526483360412-f4dbaf036963?auto=format&fit=crop&w=1600&q=80",

  swedenFocus: {
    title: "Built for Swedish public-sector procurement",
    content:
      "Prequaliq Apps is a complete e-procurement system with built-in AI for Swedish authorities, municipalities and regions. Buyers can search a supplier database using CPV codes, NUTS codes, turnover and specific keywords.",
    secondary:
      "Both authorities and suppliers have access to AI tools that help write documents. The system includes a public Q&A function, and after award the contracting authority communicates with the winning supplier through live chat instead of email.",
    badge: "Sweden · Public Sector · E-Procurement · AI",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  },

  whatIsIt: {
    title: "What is a supplier qualification system?",
    content:
      "A supplier qualification system helps public buyers ensure that suppliers meet legal, financial and quality requirements before they are invited to tender. The system registers suppliers, verifies their data and maintains a pool of approved companies ready for procurement.",
    secondary:
      "Prequaliq Apps combines supplier qualification with a dynamic purchasing system (DIS). Swedish contracting authorities can search qualified suppliers by industry, location and capacity, then run efficient two-step procurements with already reviewed suppliers.",
  },

  audiences: [] as PrequaliqAudience[],
  features: [] as PrequaliqFeature[],
  screenshots: [] as PrequaliqScreenshot[],
};
