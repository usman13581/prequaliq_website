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

export const prequaliqAppsContent = {
  title: "Prequaliq Apps",
  tagline:
    "Sweden's prequalification platform connecting procuring authorities with verified suppliers",
  shortDescription:
    "A dynamic procurement and supplier prequalification system built for Swedish public-sector buyers and qualified suppliers — developed and implemented in Sweden.",
  heroImage:
    "https://images.unsplash.com/photo-1526483360412-f4dbaf036963?auto=format&fit=crop&w=1600&q=80",

  swedenFocus: {
    title: "Built for Sweden — developed and deployed here",
    content:
      "Prequaliq Apps is a prequalification and dynamic procurement system designed specifically for the Swedish public sector. The product was developed in Sweden and is actively implemented for procuring entities and suppliers operating under Swedish public procurement law.",
    secondary:
      "Whether you are a municipality, region, government agency, or a supplier seeking public contracts, Prequaliq Apps provides a structured, transparent way to connect — with qualification, search, and procurement workflows aligned to how public procurement works in Sweden.",
    badge: "Sweden · Public Sector · Live Implementation",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  },

  whatIsIt: {
    title: "What is a prequalification system?",
    content:
      "In public procurement, procuring entities need confidence that suppliers meet legal, financial, and quality requirements before inviting them to tender. A prequalification system registers suppliers, verifies their credentials, and maintains a pool of approved businesses ready to participate in procurements.",
    secondary:
      "Prequaliq Apps combines supplier prequalification with a dynamic procurement system (DIS) — so Swedish procuring authorities can search qualified suppliers by industry, location, and capability, then run efficient two-step procurement processes with suppliers who are already vetted.",
  },

  audiences: [
    {
      title: "For procuring entities",
      subtitle: "Municipalities, regions & authorities",
      description:
        "Find the right suppliers for each procurement. Prequaliq Apps supports contracting authorities that procure under the Public Procurement Act (LOU) and the Utilities Procurement Act (LUF), with every listed supplier carefully reviewed.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      benefits: [
        "Search qualified suppliers by CPV and NUTS codes",
        "Filter by turnover, certifications, and references",
        "Run selective two-step procurement procedures",
        "Annual re-verification of all registered suppliers",
      ],
    },
    {
      title: "For suppliers",
      subtitle: "Businesses seeking public contracts",
      description:
        "Gain access to public-sector opportunities across Sweden. Suppliers apply for qualification through a straightforward process — typically within an hour — and receive a dedicated profile page once approved.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      benefits: [
        "Apply for qualification and get reviewed promptly",
        "Personal supplier page for bids and communications",
        "Automatic eligibility for procurements in your industry",
        "Annual review to maintain qualified status",
      ],
    },
  ] satisfies PrequaliqAudience[],

  features: [
    {
      title: "CPV & NUTS search",
      description:
        "Procuring entities search the supplier database using Common Procurement Vocabulary (CPV) codes for industry classification and NUTS codes for geographic location — finding relevant suppliers quickly.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Two-step procurement",
      description:
        "Procurements follow a selective procedure in two stages — keeping the process efficient for buyers while giving qualified suppliers a clear path to participate.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Dedicated portals",
      description:
        "Both procuring entities and suppliers receive their own portal pages — buyers manage call-offs and tenders, suppliers submit bids and maintain their profiles.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Supplier verification",
      description:
        "Every supplier undergoes thorough review: financial standing, business focus, environmental and quality management, references, tax compliance, and exclusion grounds — with annual re-verification.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    },
  ] satisfies PrequaliqFeature[],

  qualificationProcess: {
    title: "How supplier qualification works",
    steps: [
      {
        step: "01",
        title: "Apply online",
        description: "Suppliers submit a qualification application — typically completed within an hour.",
      },
      {
        step: "02",
        title: "Review & verification",
        description:
          "Prequaliq reviews financial status, certifications, references, and compliance requirements.",
      },
      {
        step: "03",
        title: "Qualified & listed",
        description:
          "Approved suppliers receive a unique profile and become searchable by procuring entities.",
      },
      {
        step: "04",
        title: "Annual revision",
        description:
          "All suppliers are re-verified each year to maintain trust and compliance across the platform.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
  },

  implementation: {
    title: "Developed and implemented in Sweden",
    content:
      "Prequaliq Apps is not a generic import — it was built for Swedish public procurement workflows and is in active use. Our team developed the platform locally and supports procuring entities and suppliers through implementation, onboarding, and ongoing operation.",
    points: [
      "Designed around LOU and LUF public procurement requirements",
      "Swedish-language support and local operational context",
      "Live deployment with procuring authorities and qualified suppliers",
      "Continuous improvement based on real-world public-sector use",
    ],
    image:
      "https://images.unsplash.com/photo-1578575437136-527eed3abbcd?auto=format&fit=crop&w=1200&q=80",
  },

  screenshots: [
    {
      title: "Supplier search dashboard",
      caption: "Find qualified suppliers by CPV code, region, turnover, and certifications.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Procurement workflow",
      caption: "Manage call-offs and two-step procedures from a dedicated buyer portal.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973de0a2355?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Supplier profile page",
      caption: "Each qualified supplier maintains a unique page for bids and communication.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Compliance & verification",
      caption: "Structured review of financial standing, certifications, and legal requirements.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    },
  ] satisfies PrequaliqScreenshot[],

  values: [
    {
      title: "Simplicity",
      description: "Straightforward workflows for both buyers and suppliers — qualification and procurement without unnecessary complexity.",
    },
    {
      title: "Time efficiency",
      description: "Pre-qualified suppliers and structured two-step procedures reduce time spent on every procurement cycle.",
    },
    {
      title: "Trust & transparency",
      description: "Verified suppliers, annual revisions, and clear search results give procuring entities confidence in every engagement.",
    },
  ],
};
