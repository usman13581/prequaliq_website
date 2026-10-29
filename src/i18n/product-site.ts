import type { Locale } from "./config";

export type ProductSiteMessages = {
  brand: { name: string; productName: string; tagline: string; description: string };
  nav: {
    buyers: string;
    suppliers: string;
    platform: string;
    about: string;
    blog: string;
    contact: string;
    contactSales: string;
    login: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaBuyer: string;
    ctaSupplier: string;
  };
  preferred: {
    eyebrow: string;
    title: string;
    description: string;
    stats: { value: string; label: string }[];
  };
  network: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
  };
  audiences: {
    eyebrow: string;
    title: string;
    buyers: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
      href: string;
    };
    suppliers: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
      href: string;
    };
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  cta: { title: string; description: string; button: string };
  buyersPage: {
    breadcrumb: string;
    title: string;
    description: string;
    sections: { title: string; body: string }[];
  };
  suppliersPage: {
    breadcrumb: string;
    title: string;
    description: string;
    sections: { title: string; body: string }[];
  };
  platformPage: { breadcrumb: string; title: string; description: string };
  footer: {
    blurb: string;
    buyersTitle: string;
    suppliersTitle: string;
    companyTitle: string;
    legalTitle: string;
    copyright: string;
  };
};

export const productSiteEn: ProductSiteMessages = {
  brand: {
    name: "PrequaliQ",
    productName: "Prequaliq",
    tagline: "E-procurement for the Swedish public sector",
    description:
      "Prequaliq is a complete AI-assisted e-procurement platform for Swedish authorities, municipalities and regions — from market research to contract, with supplier qualification and dynamic purchasing.",
  },
  nav: {
    buyers: "Buyers",
    suppliers: "Suppliers",
    platform: "Platform",
    about: "About",
    blog: "Insights",
    contact: "Contact",
    contactSales: "Contact sales",
    login: "Log in",
  },
  hero: {
    eyebrow: "Swedish public e-procurement",
    title: "The e-procurement platform built for Swedish public buyers and suppliers",
    description:
      "Every day, contracting authorities run procurements and suppliers look for opportunities. Prequaliq brings them together on one AI-assisted platform — so buyers run compliant processes end to end, and suppliers compete on equal terms.",
    ctaBuyer: "I am a buyer",
    ctaSupplier: "I am a supplier",
  },
  preferred: {
    eyebrow: "One platform",
    title: "Preferred by public buyers and suppliers",
    description:
      "Prequaliq keeps procurements compliant and practical, while giving public-sector suppliers a fair path to participate.",
    stats: [
      { value: "Full cycle", label: "From market research to signed contract" },
      { value: "AI-assisted", label: "Document help for buyers and suppliers" },
      { value: "DIS-ready", label: "Qualification plus dynamic purchasing" },
    ],
  },
  network: {
    eyebrow: "Built for Sweden",
    title: "A clearer way to connect public buyers and suppliers",
    description:
      "Prequaliq is developed for Swedish public-sector workflows — LOU/LUF context, searchable suppliers, transparent Q&A, and live chat after award.",
    points: [
      "Buyers search suppliers by CPV, NUTS, turnover and keywords",
      "Suppliers qualify once and stay visible for relevant procurements",
      "Both sides save time with AI drafting, public Q&A and post-award chat",
    ],
  },
  features: {
    eyebrow: "Platform",
    title: "Everything you need for public e-procurement",
    items: [
      {
        title: "Searchable supplier database",
        description:
          "Find the right suppliers using CPV codes, NUTS codes, turnover and specific keywords.",
      },
      {
        title: "Built-in AI assistance",
        description:
          "Authorities and suppliers use AI to draft clearer procurement and tender documents faster.",
      },
      {
        title: "Public Q&A",
        description:
          "Keep clarifications transparent for every participant during the procurement.",
      },
      {
        title: "Live chat after award",
        description:
          "After contract award, communicate with the winning supplier in live chat — not email threads.",
      },
      {
        title: "Supplier qualification",
        description:
          "Register, verify and maintain a pool of approved suppliers ready for invitation to tender.",
      },
      {
        title: "Dynamic purchasing (DIS)",
        description:
          "Run efficient two-step procurements with already reviewed suppliers.",
      },
    ],
  },
  audiences: {
    eyebrow: "Who it is for",
    title: "Two sides of public procurement — one system",
    buyers: {
      title: "For contracting authorities",
      subtitle: "Municipalities, regions and authorities",
      description:
        "Manage the full e-procurement process, find pre-qualified suppliers, and keep every step transparent.",
      cta: "Explore for buyers",
      href: "/buyers",
    },
    suppliers: {
      title: "For suppliers",
      subtitle: "Businesses seeking public contracts",
      description:
        "Get qualified, stay discoverable, and communicate clearly through Q&A and post-award live chat.",
      cta: "Explore for suppliers",
      href: "/suppliers",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    items: [
      {
        q: "What is Prequaliq?",
        a: "Prequaliq is a complete e-procurement system with built-in AI for Swedish authorities, municipalities and regions. It covers the full process from market research to signing contracts.",
      },
      {
        q: "Who can use the platform?",
        a: "Contracting authorities (buyers) and suppliers that want to participate in Swedish public procurement. Each side has dedicated workflows and tools.",
      },
      {
        q: "How does supplier qualification work?",
        a: "Suppliers apply online, PrequaliQ reviews legal, financial and quality requirements, approved suppliers are listed and searchable, and status is re-verified annually.",
      },
      {
        q: "Does Prequaliq support dynamic purchasing systems?",
        a: "Yes. Supplier qualification is combined with a dynamic purchasing system (DIS) so buyers can run efficient two-step procurements with already reviewed suppliers.",
      },
      {
        q: "How do we get started?",
        a: "Contact our team for a walkthrough tailored to your organisation — whether you are a buyer or a supplier.",
      },
    ],
  },
  cta: {
    title: "Ready to modernise public procurement?",
    description:
      "Tell us whether you are a buyer or a supplier. We will show how Prequaliq fits your process.",
    button: "Contact sales",
  },
  buyersPage: {
    breadcrumb: "Buyers",
    title: "E-procurement for contracting authorities",
    description:
      "Run compliant Swedish public procurements end to end — search qualified suppliers, draft with AI, keep Q&A transparent, and finish with live post-award collaboration.",
    sections: [
      {
        title: "Find the right suppliers faster",
        body: "Search the supplier database with CPV and NUTS codes, turnover and keywords. Work with suppliers that are already reviewed for legal, financial and quality requirements.",
      },
      {
        title: "Run the full process in one place",
        body: "From market research to award and contract, Prequaliq keeps the workflow structured for municipalities, regions and authorities operating under LOU and LUF.",
      },
      {
        title: "Stay transparent after award",
        body: "Use public Q&A during the procurement, then switch to live chat with the awarded supplier instead of scattered email threads.",
      },
    ],
  },
  suppliersPage: {
    breadcrumb: "Suppliers",
    title: "Reach public-sector opportunities across Sweden",
    description:
      "Qualify once, stay searchable for relevant procurements, use AI to support your documents, and communicate clearly with buyers.",
    sections: [
      {
        title: "Get qualified and visible",
        body: "Apply online, complete verification, and receive a supplier profile that contracting authorities can find when they search by industry, location and capacity.",
      },
      {
        title: "Compete on equal terms",
        body: "Participate in procurements within your field with clear processes, public Q&A and tools designed for Swedish public-sector purchasing.",
      },
      {
        title: "Collaborate after you win",
        body: "After award, work with the contracting authority through live chat — faster and clearer than email-only follow-up.",
      },
    ],
  },
  platformPage: {
    breadcrumb: "Platform",
    title: "Prequaliq — E-Procurement system",
    description:
      "A complete AI-assisted e-procurement platform for Swedish public buyers and suppliers.",
  },
  footer: {
    blurb:
      "Prequaliq helps Swedish public buyers and suppliers run transparent, efficient e-procurement — with AI, qualification and dynamic purchasing on one platform.",
    buyersTitle: "Buyers",
    suppliersTitle: "Suppliers",
    companyTitle: "Company",
    legalTitle: "Legal",
    copyright: "All rights reserved.",
  },
};

export const productSiteSv: ProductSiteMessages = {
  brand: {
    name: "PrequaliQ",
    productName: "Prequaliq",
    tagline: "E-upphandling för svensk offentlig sektor",
    description:
      "Prequaliq är ett komplett AI-stött e-upphandlingssystem för svenska myndigheter, kommuner och regioner — från marknadsanalys till kontrakt, med leverantörskvalificering och dynamiskt inköp.",
  },
  nav: {
    buyers: "Upphandlare",
    suppliers: "Leverantörer",
    platform: "Plattform",
    about: "Om oss",
    blog: "Insikter",
    contact: "Kontakt",
    contactSales: "Kontakta sälj",
    login: "Logga in",
  },
  hero: {
    eyebrow: "Svensk offentlig e-upphandling",
    title: "E-upphandlingsplattformen för svenska offentliga köpare och leverantörer",
    description:
      "Varje dag publicerar offentliga köpare upphandlingar, och leverantörer söker nya affärer. Prequaliq sammanför dem på en AI-stött plattform — så att upphandlare kan hantera hela processen, och leverantörer kan tävla på lika villkor.",
    ctaBuyer: "Jag är upphandlare",
    ctaSupplier: "Jag är leverantör",
  },
  preferred: {
    eyebrow: "En plattform",
    title: "För både offentliga köpare och leverantörer",
    description:
      "Prequaliq gör upphandlingar regelrätta och praktiska, samtidigt som leverantörer till offentlig sektor får en rättvis väg att delta.",
    stats: [
      { value: "Hela flödet", label: "Från marknadsanalys till signerat kontrakt" },
      { value: "AI-stöd", label: "Dokumenthjälp för köpare och leverantörer" },
      { value: "DIS-redo", label: "Kvalificering plus dynamiskt inköp" },
    ],
  },
  network: {
    eyebrow: "Byggt för Sverige",
    title: "Ett tydligare sätt att koppla samman köpare och leverantörer",
    description:
      "Prequaliq är utvecklat för svenska offentliga arbetsflöden — LOU/LUF-kontext, sökbara leverantörer, transparent Q&A och livechatt efter tilldelning.",
    points: [
      "Köpare söker leverantörer med CPV, NUTS, omsättning och nyckelord",
      "Leverantörer kvalificerar sig en gång och syns i relevanta upphandlingar",
      "Båda sidor sparar tid med AI, offentlig Q&A och chatt efter tilldelning",
    ],
  },
  features: {
    eyebrow: "Plattform",
    title: "Allt ni behöver för offentlig e-upphandling",
    items: [
      {
        title: "Sökbar leverantörsdatabas",
        description:
          "Hitta rätt leverantörer med CPV-koder, NUTS-koder, omsättning och specifika nyckelord.",
      },
      {
        title: "Inbyggd AI-hjälp",
        description:
          "Myndigheter och leverantörer använder AI för att snabbare skriva tydligare upphandlings- och anbudsdokument.",
      },
      {
        title: "Offentlig frågefunktion",
        description:
          "Håll förtydliganden transparenta för alla deltagare under upphandlingen.",
      },
      {
        title: "Livechatt efter tilldelning",
        description:
          "Efter tilldelning kommunicerar ni med den vinnande leverantören via livechatt — inte e-posttrådar.",
      },
      {
        title: "Leverantörskvalificering",
        description:
          "Registrera, verifiera och behåll en grupp godkända leverantörer redo för anbudsinbjudan.",
      },
      {
        title: "Dynamiskt inköp (DIS)",
        description:
          "Genomför effektiva tvåstegsupphandlingar med redan granskade leverantörer.",
      },
    ],
  },
  audiences: {
    eyebrow: "För vem",
    title: "Två sidor av offentlig upphandling — ett system",
    buyers: {
      title: "För upphandlande myndigheter",
      subtitle: "Kommuner, regioner och myndigheter",
      description:
        "Hantera hela e-upphandlingsprocessen, hitta förkvalificerade leverantörer och håll varje steg transparent.",
      cta: "Utforska för upphandlare",
      href: "/buyers",
    },
    suppliers: {
      title: "För leverantörer",
      subtitle: "Företag som söker offentliga affärer",
      description:
        "Bli kvalificerad, håll dig sökbar och kommunicera tydligt via Q&A och livechatt efter tilldelning.",
      cta: "Utforska för leverantörer",
      href: "/suppliers",
    },
  },
  faq: {
    eyebrow: "Vanliga frågor",
    title: "Vanliga frågor",
    items: [
      {
        q: "Vad är Prequaliq?",
        a: "Prequaliq är ett komplett e-upphandlingssystem med inbyggd AI för svenska myndigheter, kommuner och regioner. Det täcker hela processen från marknadsanalys till kontraktskrivning.",
      },
      {
        q: "Vem kan använda plattformen?",
        a: "Upphandlande myndigheter (köpare) och leverantörer som vill delta i svensk offentlig upphandling. Varje sida har egna arbetsflöden och verktyg.",
      },
      {
        q: "Hur fungerar leverantörskvalificering?",
        a: "Leverantörer ansöker online, PrequaliQ granskar juridiska, finansiella och kvalitetsmässiga krav, godkända leverantörer listas och blir sökbara, och status omprövas årligen.",
      },
      {
        q: "Stöder Prequaliq dynamiska inköpssystem?",
        a: "Ja. Leverantörskvalificering kombineras med ett dynamiskt inköpssystem (DIS) så att köpare kan genomföra effektiva tvåstegsupphandlingar med redan granskade leverantörer.",
      },
      {
        q: "Hur kommer vi igång?",
        a: "Kontakta vårt team för en genomgång anpassad till er organisation — oavsett om ni är köpare eller leverantör.",
      },
    ],
  },
  cta: {
    title: "Redo att modernisera offentlig upphandling?",
    description:
      "Berätta om ni är upphandlare eller leverantör. Vi visar hur Prequaliq passar ert flöde.",
    button: "Kontakta sälj",
  },
  buyersPage: {
    breadcrumb: "Upphandlare",
    title: "E-upphandling för upphandlande myndigheter",
    description:
      "Genomför regelrätta svenska offentliga upphandlingar från början till slut — sök kvalificerade leverantörer, skriv med AI, håll Q&A transparent och avsluta med live-samarbete efter tilldelning.",
    sections: [
      {
        title: "Hitta rätt leverantörer snabbare",
        body: "Sök i leverantörsdatabasen med CPV- och NUTS-koder, omsättning och nyckelord. Arbeta med leverantörer som redan granskats för juridiska, finansiella och kvalitetsmässiga krav.",
      },
      {
        title: "Kör hela processen på ett ställe",
        body: "Från marknadsanalys till tilldelning och kontrakt håller Prequaliq arbetsflödet strukturerat för kommuner, regioner och myndigheter enligt LOU och LUF.",
      },
      {
        title: "Var transparent efter tilldelning",
        body: "Använd offentlig Q&A under upphandlingen och gå sedan över till livechatt med den tilldelade leverantören i stället för utspridda e-posttrådar.",
      },
    ],
  },
  suppliersPage: {
    breadcrumb: "Leverantörer",
    title: "Nå offentliga affärsmöjligheter i hela Sverige",
    description:
      "Kvalificera er en gång, håll er sökbara för relevanta upphandlingar, använd AI som stöd i dokumenten och kommunicera tydligt med upphandlare.",
    sections: [
      {
        title: "Bli kvalificerad och synlig",
        body: "Ansök online, slutför verifiering och få en leverantörsprofil som upphandlande myndigheter kan hitta när de söker efter bransch, plats och kapacitet.",
      },
      {
        title: "Tävla på lika villkor",
        body: "Delta i upphandlingar inom ert område med tydliga processer, offentlig Q&A och verktyg utformade för svensk offentlig upphandling.",
      },
      {
        title: "Samarbeta när ni vunnit",
        body: "Efter tilldelning arbetar ni med den upphandlande myndigheten via livechatt — snabbare och tydligare än enbart e-post.",
      },
    ],
  },
  platformPage: {
    breadcrumb: "Plattform",
    title: "Prequaliq — E-upphandlingssystem",
    description:
      "Ett komplett AI-stött e-upphandlingssystem för svenska offentliga köpare och leverantörer.",
  },
  footer: {
    blurb:
      "Prequaliq hjälper svenska offentliga köpare och leverantörer att driva transparent, effektiv e-upphandling — med AI, kvalificering och dynamiskt inköp på en plattform.",
    buyersTitle: "Upphandlare",
    suppliersTitle: "Leverantörer",
    companyTitle: "Företag",
    legalTitle: "Juridiskt",
    copyright: "Alla rättigheter förbehållna.",
  },
};

export function getProductSite(locale: Locale): ProductSiteMessages {
  return locale === "sv" ? productSiteSv : productSiteEn;
}
