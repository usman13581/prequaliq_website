import type { Locale } from "./config";

export type ProductSiteMessages = {
  brand: { name: string; productName: string; tagline: string; description: string };
  nav: {
    buyers: string;
    suppliers: string;
    platform: string;
    about: string;
    blog: string;
    pricing: string;
    careers: string;
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
    privacy: string;
    terms: string;
    copyright: string;
  };
};

export const productSiteEn: ProductSiteMessages = {
  brand: {
    name: "PrequaliQ",
    productName: "Prequaliq",
    tagline: "Public e-procurement for Sweden",
    description:
      "Prequaliq is the AI-powered public procurement platform for Swedish authorities, municipalities, regions and suppliers — from market research to signed contract, with qualification and dynamic purchasing on one system.",
  },
  nav: {
    buyers: "Buyers",
    suppliers: "Suppliers",
    platform: "Platform",
    about: "About",
    blog: "Insights",
    pricing: "Pricing",
    careers: "Careers",
    contact: "Contact",
    contactSales: "Contact sales",
    login: "Log in",
  },
  hero: {
    eyebrow: "Swedish public procurement",
    title: "Sweden’s AI-powered public procurement platform",
    description:
      "Every day, public buyers publish tenders and suppliers search for new opportunities. Prequaliq brings them together on one unified, AI-assisted platform that makes public procurement clear and practical. We help buyers manage tendering end to end — and suppliers compete for the contracts that matter.",
    ctaBuyer: "I am a buyer",
    ctaSupplier: "Create free supplier account",
  },
  preferred: {
    eyebrow: "One platform",
    title: "The preferred tendering and bidding platform for public buyers and suppliers",
    description:
      "Prequaliq makes tenders compliant and easier to run, while giving every public-sector supplier a fair path to participate — with AI support, transparent Q&A and structured workflows built for LOU and LUF.",
    stats: [
      { value: "End-to-end", label: "Public entities manage and source tenders in one workflow" },
      { value: "Qualified", label: "Suppliers verified once and kept searchable for buyers" },
      { value: "Sweden-first", label: "Built for Swedish authorities, municipalities and regions" },
    ],
  },
  network: {
    eyebrow: "Procurement network",
    title: "A stronger way to connect public buyers and suppliers in Sweden",
    description:
      "Prequaliq connects contracting authorities and suppliers on one platform — so it is easier to find each other, run fair competitions, and deliver results that matter. Every organisation that joins makes the network more valuable for everyone in it.",
    points: [
      "Suppliers find more relevant procurements and grow their public-sector business",
      "Buyers reach a clearer, more competitive supplier base for every tender",
      "Both sides save time, work with greater transparency, and keep communication in one place",
    ],
  },
  features: {
    eyebrow: "Platform capabilities",
    title: "Everything your procurement needs — in one system",
    items: [
      {
        title: "Searchable supplier database",
        description:
          "Find the right suppliers with CPV codes, NUTS codes, turnover and keywords — so each tender starts with a stronger, more relevant market.",
      },
      {
        title: "Built-in AI assistance",
        description:
          "Draft clearer procurement and tender documents faster. AI helps both authorities and suppliers reduce manual work without losing control.",
      },
      {
        title: "Transparent public Q&A",
        description:
          "Keep clarifications centralised and visible to every participant — stronger compliance, fewer email threads, and a cleaner audit trail.",
      },
      {
        title: "Live chat after award",
        description:
          "After contract award, collaborate with the winning supplier in live chat instead of scattered inboxes — faster handovers and clearer follow-up.",
      },
      {
        title: "Supplier qualification",
        description:
          "Register, verify and maintain a pool of approved suppliers ready for invitation to tender — with annual re-verification of legal, financial and quality requirements.",
      },
      {
        title: "Dynamic purchasing (DIS)",
        description:
          "Run efficient two-step procurements with already reviewed suppliers — less admin, more speed, still fully structured for public sector rules.",
      },
    ],
  },
  audiences: {
    eyebrow: "Who it is for",
    title: "Two sides of public procurement — one connected platform",
    buyers: {
      title: "For public buyers",
      subtitle: "Municipalities, regions and contracting authorities",
      description:
        "Manage the full procurement lifecycle in one place: plan, tender, evaluate, award and follow up — with qualified suppliers and full visibility.",
      cta: "Explore for buyers",
      href: "/buyers",
    },
    suppliers: {
      title: "For suppliers",
      subtitle: "Businesses selling to the public sector",
      description:
        "Get qualified, stay discoverable for the right opportunities, prepare stronger documents with AI, and communicate clearly through Q&A and post-award chat.",
      cta: "Explore for suppliers",
      href: "/suppliers",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        q: "What is Prequaliq?",
        a: "Prequaliq is a complete AI-assisted e-procurement system for Swedish authorities, municipalities and regions. It covers the full process from market research to signing contracts — and connects buyers with qualified suppliers on one platform.",
      },
      {
        q: "Who can use the platform?",
        a: "Contracting authorities (public buyers) and suppliers that want to participate in Swedish public procurement. Each side has dedicated workflows, tools and communication channels.",
      },
      {
        q: "How does supplier qualification work?",
        a: "Suppliers apply online. PrequaliQ reviews legal, financial and quality requirements. Approved suppliers are listed and searchable for buyers, and status is re-verified annually so the pool stays current.",
      },
      {
        q: "Does Prequaliq support dynamic purchasing systems (DIS)?",
        a: "Yes. Supplier qualification is combined with a dynamic purchasing system so buyers can run efficient two-step procurements with already reviewed suppliers.",
      },
      {
        q: "How is Prequaliq different from generic tender portals?",
        a: "Prequaliq is built as an operating system for the full Swedish procurement process — not only notices. You get qualification, DIS, AI drafting help, public Q&A and live chat after award in one product.",
      },
      {
        q: "How do we get started?",
        a: "Contact our team for a walkthrough tailored to your organisation — whether you are a buyer or a supplier. We will show how Prequaliq fits your process and discuss pricing.",
      },
    ],
  },
  cta: {
    title: "Ready to evolve how you procure — or how you win public contracts?",
    description:
      "Tell us whether you are a buyer or a supplier. We will show how Prequaliq makes public procurement easier, clearer and more competitive.",
    button: "Contact sales",
  },
  buyersPage: {
    breadcrumb: "Buyers",
    title: "Manage your entire procurement lifecycle in one platform",
    description:
      "Prequaliq simplifies procurement for Swedish public buyers — connecting planning, tendering, supplier search, evaluation, award and post-award collaboration with full visibility and compliance.",
    sections: [
      {
        title: "From fragmented tools to one connected workflow",
        body: "When procurement relies on separate systems and inboxes, work slows down and documentation becomes inconsistent. Prequaliq connects market research, tendering, supplier qualification, Q&A, award and live follow-up — so your team keeps control across the full lifecycle.",
      },
      {
        title: "Find a stronger supplier base for every tender",
        body: "Search pre-qualified suppliers by CPV, NUTS, turnover and keywords. Invite suppliers that already meet legal, financial and quality requirements — and run DIS when you need faster, structured two-step competitions.",
      },
      {
        title: "Make tendering easier — without losing compliance",
        body: "Use AI to draft clearer documents, keep clarifications transparent in public Q&A, and move into live chat with the awarded supplier. Built for municipalities, regions and authorities working under LOU and LUF.",
      },
    ],
  },
  suppliersPage: {
    breadcrumb: "Suppliers",
    title: "Find, qualify and win public-sector opportunities",
    description:
      "Move beyond scattered portals. Prequaliq helps suppliers get qualified, stay visible to Swedish public buyers, prepare stronger responses with AI, and collaborate clearly through Q&A and post-award live chat.",
    sections: [
      {
        title: "Get qualified — then stay discoverable",
        body: "Apply online, complete verification, and receive a supplier profile contracting authorities can find when they search by industry, location and capacity. Annual re-verification keeps your status current.",
      },
      {
        title: "Compete on equal terms with clearer tools",
        body: "Participate in relevant procurements with transparent public Q&A and AI support for documents — so you spend less time on admin and more time on a competitive bid.",
      },
      {
        title: "Win — then deliver with less friction",
        body: "After award, work with the contracting authority in live chat instead of endless email threads. Faster clarification, clearer ownership, and a smoother start to delivery.",
      },
    ],
  },
  platformPage: {
    breadcrumb: "Platform",
    title: "Prequaliq — public e-procurement system",
    description:
      "One AI-assisted platform where Swedish public buyers and suppliers find each other, run compliant procurements, and deliver results that matter.",
  },
  footer: {
    blurb:
      "Prequaliq brings Swedish public buyers and suppliers together on one AI-powered platform — so procurement stays compliant, competitive and practical from first search to signed contract.",
    buyersTitle: "Buyers",
    suppliersTitle: "Suppliers",
    companyTitle: "Company",
    legalTitle: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    copyright: "All rights reserved.",
  },
};

export const productSiteSv: ProductSiteMessages = {
  brand: {
    name: "PrequaliQ",
    productName: "Prequaliq",
    tagline: "Offentlig e-upphandling för Sverige",
    description:
      "Prequaliq är den AI-drivna plattformen för offentlig upphandling i Sverige — för myndigheter, kommuner, regioner och leverantörer. Från marknadsanalys till signerat kontrakt, med kvalificering och dynamiskt inköp i ett system.",
  },
  nav: {
    buyers: "Upphandlare",
    suppliers: "Leverantörer",
    platform: "Plattform",
    about: "Om oss",
    blog: "Insikter",
    pricing: "Priser",
    careers: "Karriär",
    contact: "Kontakt",
    contactSales: "Kontakta sälj",
    login: "Logga in",
  },
  hero: {
    eyebrow: "Svensk offentlig upphandling",
    title: "Sveriges AI-drivna plattform för offentlig upphandling",
    description:
      "Varje dag publicerar offentliga köpare upphandlingar, och leverantörer letar efter nya affärsmöjligheter. Prequaliq sammanför dem på en samlad, AI-stödd plattform som gör offentlig upphandling tydlig och praktisk. Vi hjälper köpare att hantera hela processen — och leverantörer att vinna kontrakten som spelar roll.",
    ctaBuyer: "Jag är upphandlare",
    ctaSupplier: "Skapa gratis leverantörskonto",
  },
  preferred: {
    eyebrow: "En plattform",
    title: "Den föredragna plattformen för offentliga köpare och leverantörer",
    description:
      "Prequaliq gör upphandlingar regelrätta och enklare att driva, samtidigt som leverantörer till offentlig sektor får likvärdiga möjligheter — med AI-stöd, transparent Q&A och arbetsflöden byggda för LOU och LUF.",
    stats: [
      { value: "Helhetsflöde", label: "Offentliga organisationer hanterar och genomför upphandlingar i ett arbetsflöde" },
      { value: "Kvalificerade", label: "Leverantörer verifieras en gång och hålls sökbara för köpare" },
      { value: "Sverigefokus", label: "Byggt för svenska myndigheter, kommuner och regioner" },
    ],
  },
  network: {
    eyebrow: "Upphandlingsnätverk",
    title: "Ett starkare sätt att koppla samman offentliga köpare och leverantörer i Sverige",
    description:
      "Prequaliq sammanför upphandlande myndigheter och leverantörer på en plattform — så att det blir lättare att hitta varandra, göra affärer och leverera resultat som gör skillnad. Varje organisation som ansluter gör nätverket mer värdefullt för alla.",
    points: [
      "Leverantörer hittar fler relevanta upphandlingar och växer sin offentliga affär",
      "Köpare når en tydligare och mer konkurrenskraftig leverantörsbas i varje upphandling",
      "Båda sidor sparar tid, arbetar mer transparent och håller kommunikationen på ett ställe",
    ],
  },
  features: {
    eyebrow: "Plattformens funktioner",
    title: "Allt er upphandling behöver — i ett system",
    items: [
      {
        title: "Sökbar leverantörsdatabas",
        description:
          "Hitta rätt leverantörer med CPV-koder, NUTS-koder, omsättning och nyckelord — så varje upphandling startar med en starkare och mer relevant marknad.",
      },
      {
        title: "Inbyggd AI-hjälp",
        description:
          "Skriv tydligare upphandlings- och anbudsdokument snabbare. AI hjälper både myndigheter och leverantörer att minska manuellt arbete utan att tappa kontrollen.",
      },
      {
        title: "Transparent offentlig Q&A",
        description:
          "Håll förtydliganden samlade och synliga för alla deltagare — starkare regelefterlevnad, färre e-posttrådar och en renare revisionsspår.",
      },
      {
        title: "Livechatt efter tilldelning",
        description:
          "Efter tilldelning samarbetar ni med den vinnande leverantören via livechatt i stället för utspridda inkorgar — snabbare överlämning och tydligare uppföljning.",
      },
      {
        title: "Leverantörskvalificering",
        description:
          "Registrera, verifiera och behåll en grupp godkända leverantörer redo för anbudsinbjudan — med årlig omprövning av juridiska, finansiella och kvalitetsmässiga krav.",
      },
      {
        title: "Dynamiskt inköp (DIS)",
        description:
          "Genomför effektiva tvåstegsupphandlingar med redan granskade leverantörer — mindre administration, mer tempo, fortfarande strukturerat för offentlig sektor.",
      },
    ],
  },
  audiences: {
    eyebrow: "För vem",
    title: "Två sidor av offentlig upphandling — en sammanhållen plattform",
    buyers: {
      title: "För offentliga köpare",
      subtitle: "Kommuner, regioner och upphandlande myndigheter",
      description:
        "Hantera hela upphandlingscykeln på ett ställe: planera, upphandla, utvärdera, tilldela och följ upp — med kvalificerade leverantörer och full överblick.",
      cta: "Utforska för upphandlare",
      href: "/buyers",
    },
    suppliers: {
      title: "För leverantörer",
      subtitle: "Företag som säljer till offentlig sektor",
      description:
        "Bli kvalificerad, håll dig synlig för rätt möjligheter, skriv starkare dokument med AI och kommunicera tydligt via Q&A och chatt efter tilldelning.",
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
        a: "Prequaliq är ett komplett AI-stött e-upphandlingssystem för svenska myndigheter, kommuner och regioner. Det täcker hela processen från marknadsanalys till kontraktskrivning — och kopplar samman köpare med kvalificerade leverantörer på en plattform.",
      },
      {
        q: "Vem kan använda plattformen?",
        a: "Upphandlande myndigheter (offentliga köpare) och leverantörer som vill delta i svensk offentlig upphandling. Varje sida har egna arbetsflöden, verktyg och kommunikationskanaler.",
      },
      {
        q: "Hur fungerar leverantörskvalificering?",
        a: "Leverantörer ansöker online. PrequaliQ granskar juridiska, finansiella och kvalitetsmässiga krav. Godkända leverantörer listas och blir sökbara för köpare, och status omprövas årligen så att poolen hålls aktuell.",
      },
      {
        q: "Stöder Prequaliq dynamiska inköpssystem (DIS)?",
        a: "Ja. Leverantörskvalificering kombineras med ett dynamiskt inköpssystem så att köpare kan genomföra effektiva tvåstegsupphandlingar med redan granskade leverantörer.",
      },
      {
        q: "Hur skiljer sig Prequaliq från generella upphandlingsportaler?",
        a: "Prequaliq är byggt som ett operativsystem för hela den svenska upphandlingsprocessen — inte bara annonser. Ni får kvalificering, DIS, AI-stöd, offentlig Q&A och livechatt efter tilldelning i en produkt.",
      },
      {
        q: "Hur kommer vi igång?",
        a: "Kontakta vårt team för en genomgång anpassad till er organisation — oavsett om ni är köpare eller leverantör. Vi visar hur Prequaliq passar ert flöde och diskuterar priser.",
      },
    ],
  },
  cta: {
    title: "Redo att utveckla hur ni upphandlar — eller hur ni vinner offentliga affärer?",
    description:
      "Berätta om ni är köpare eller leverantör. Vi visar hur Prequaliq gör offentlig upphandling enklare, tydligare och mer konkurrenskraftig.",
    button: "Kontakta sälj",
  },
  buyersPage: {
    breadcrumb: "Upphandlare",
    title: "Hantera hela upphandlingscykeln i en plattform",
    description:
      "Prequaliq förenklar upphandling för svenska offentliga köpare — och kopplar samman planering, upphandling, leverantörssök, utvärdering, tilldelning och uppföljning med full överblick och regelefterlevnad.",
    sections: [
      {
        title: "Från fragmenterade verktyg till ett sammanhållet flöde",
        body: "När upphandling sprids över flera system och inkorgar blir arbetet långsammare och dokumentationen ojämn. Prequaliq kopplar ihop marknadsanalys, upphandling, leverantörskvalificering, Q&A, tilldelning och liveuppföljning — så att teamet behåller kontrollen genom hela cykeln.",
      },
      {
        title: "Hitta en starkare leverantörsbas i varje upphandling",
        body: "Sök förkvalificerade leverantörer med CPV, NUTS, omsättning och nyckelord. Bjud in leverantörer som redan uppfyller juridiska, finansiella och kvalitetsmässiga krav — och kör DIS när ni behöver snabbare, strukturerade tvåstegsupphandlingar.",
      },
      {
        title: "Gör upphandlingen enklare — utan att tappa regelefterlevnad",
        body: "Använd AI för att skriva tydligare dokument, håll förtydliganden transparenta i offentlig Q&A och gå vidare till livechatt med den tilldelade leverantören. Byggt för kommuner, regioner och myndigheter enligt LOU och LUF.",
      },
    ],
  },
  suppliersPage: {
    breadcrumb: "Leverantörer",
    title: "Hitta, kvalificera er och vinn offentliga affärer",
    description:
      "Gå bortom utspridda portaler. Prequaliq hjälper leverantörer att bli kvalificerade, synas för svenska offentliga köpare, skriva starkare svar med AI och samarbeta tydligt via Q&A och livechatt efter tilldelning.",
    sections: [
      {
        title: "Bli kvalificerad — och håll dig synlig",
        body: "Ansök online, slutför verifiering och få en leverantörsprofil som upphandlande myndigheter kan hitta när de söker efter bransch, plats och kapacitet. Årlig omprövning håller er status aktuell.",
      },
      {
        title: "Tävla på lika villkor med tydligare verktyg",
        body: "Delta i relevanta upphandlingar med transparent offentlig Q&A och AI-stöd för dokument — så ni lägger mindre tid på administration och mer tid på ett konkurrenskraftigt anbud.",
      },
      {
        title: "Vinn — och leverera med mindre friktion",
        body: "Efter tilldelning arbetar ni med den upphandlande myndigheten via livechatt i stället för oändliga e-posttrådar. Snabbare förtydliganden, tydligare ansvar och en smidigare start på leveransen.",
      },
    ],
  },
  platformPage: {
    breadcrumb: "Plattform",
    title: "Prequaliq — e-upphandlingssystem",
    description:
      "En AI-stödd plattform där svenska offentliga köpare och leverantörer hittar varandra, genomför regelrätta upphandlingar och levererar resultat som gör skillnad.",
  },
  footer: {
    blurb:
      "Prequaliq sammanför svenska offentliga köpare och leverantörer på en AI-driven plattform — så att upphandling förblir regelrätt, konkurrenskraftig och praktisk från första sökning till signerat kontrakt.",
    buyersTitle: "Upphandlare",
    suppliersTitle: "Leverantörer",
    companyTitle: "Företag",
    legalTitle: "Juridiskt",
    privacy: "Integritetspolicy",
    terms: "Villkor",
    copyright: "Alla rättigheter förbehållna.",
  },
};

export function getProductSite(locale: Locale): ProductSiteMessages {
  return locale === "sv" ? productSiteSv : productSiteEn;
}
