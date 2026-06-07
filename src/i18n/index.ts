import type { Locale } from "./config";
import { en } from "./locales/en";
import { sv } from "./locales/sv";
import {
  allServiceSlugs,
  serviceCategoryStructure,
  serviceImages,
  type ServiceSlug,
} from "./service-structure";
import type { ServiceMenuCategory } from "@/lib/services-catalog";

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepString<U>[]
    : T extends object
      ? { [K in keyof T]: DeepString<T[K]> }
      : T;

export type Messages = DeepString<typeof en>;

type SvServiceItem = (typeof sv.services.items)[keyof typeof sv.services.items] & {
  menuDescription?: string;
};

export function getMessages(locale: Locale): Messages {
  if (locale === "en") return en;
  return buildSwedishMessages();
}

function buildSwedishMessages(): Messages {
  const s = sv;

  return {
    ...en,
    common: {
      ...en.common,
      contact: "Kontakt",
      getStarted: s.common.getStarted,
      discoverMore: "Upptäck mer",
      readMore: s.common.readMore,
      viewAll: s.common.viewAll,
      getQuote: "Få en offert",
      requestDemo: s.common.requestDemo,
      close: s.common.close,
      learnMore: s.common.learnMore,
      exploreProduct: "Utforska produkten",
      email: "E-post",
      phone: "Telefon",
      office: "Kontor",
      product: "Produkt",
    },
    site: {
      ...en.site,
      tagline: s.site.tagline,
      description: s.site.description,
      topBar: "Webb- och mobilappsutveckling för företag — Sverige",
    },
    nav: {
      home: s.nav.home,
      products: s.nav.products,
      services: s.nav.services,
      whoWeAre: s.nav.whoWeAre,
      prequaliqApps: s.nav.prequaliqApps,
      enterpriseHub: s.nav.enterpriseHub,
      meetTheTeam: s.nav.meetTheTeam,
      contact: "Kontakt",
      getStarted: s.common.getStarted,
    },
    footer: {
      ctaTitle: "Låt oss bygga något extraordinärt",
      ctaSubtitle: "Kontakta oss för en kostnadsfri konsultation.",
      contactUs: s.common.contactUs,
      helpAndAdvice: s.footer.helpAndAdviceTitle,
      quickLinks: s.footer.quickLinksTitle,
      copyright: s.footer.copyright,
      helpLinks: {
        howItWorks: s.footer.howItWorks,
        customerSupport: s.footer.customerSupport,
        privacyPolicy: s.footer.privacyPolicy,
        termsConditions: s.footer.termsConditions,
      },
      quickNav: {
        home: s.nav.home,
        services: s.footer.ourServices,
        products: s.footer.ourProducts,
        team: s.footer.meetTheTeam,
      },
    },
    home: {
      hero: {
        title: `${s.site.name} ${s.site.tagline}`,
        description: s.home.hero.subtitle,
        pills: [
          "Webbapplikationer",
          "Mobilappar",
          "Företagsintegrationer",
          "Molnlösningar",
        ],
      },
      whatWeOffer: {
        eyebrow: s.home.servicesIntro.title.toLowerCase(),
        title: "Företagslösningar för webb och mobil",
        description: s.home.servicesIntro.description,
      },
      products: {
        eyebrow: s.home.productsIntro.title,
        title: "Applikationer byggda för företagsskala",
      },
      whoWeAre: {
        eyebrow: s.team.whoWeAre.title,
        title: "Din partner inom företagsapplikationsutveckling",
        description: s.team.whoWeAre.description,
        meetTeam: s.nav.meetTheTeam,
      },
      values: s.team.values,
      trustedBy: { label: "Det vi levererar" },
      clients: [
        "Webbapplikationer",
        "Mobilappar",
        "Molnlösningar",
        "Systemintegration",
        "AI och automatisering",
        "Data och analys",
        "Dedikerade team",
        "Skräddarsydd programvara",
      ],
      whyChooseUs: {
        eyebrow: "Varför välja oss",
        title: s.home.whyChooseUs.intro,
        description: "De tre bästa skälen att välja vår tjänst.",
        items: s.home.whyChooseUs.items,
      },
      stats: s.home.stats,
      oracleSection: {
        ...s.home.oracleSection,
        exploreServices: "Utforska våra tjänster",
      },
      managementSection: {
        ...s.home.managementSection,
        contactUs: s.common.contactUs,
      },
      featuredServices: {
        eyebrow: "Utvalda tjänster",
        title: "Expertslösningar för modern verksamhet",
        description:
          "Vi levererar skräddarsydda lösningar inom webb, mobil, moln och intelligent automation.",
        items: [
          {
            date: s.home.featuredServices[0].date,
            title: s.home.featuredServices[0].title,
            href: "/services/web-and-mobile-apps",
          },
          {
            date: s.home.featuredServices[1].date,
            title: s.home.featuredServices[1].title,
            href: "/services/cloud-solutions",
          },
          {
            date: s.home.featuredServices[2].date,
            title: s.home.featuredServices[2].title,
            href: "/services/ai-solutions",
          },
        ],
      },
      cta: {
        title: s.home.cta.title,
        subtitle: s.home.cta.description,
        requestDemo: s.common.requestDemo,
        getServicesQuote: "Få offert på tjänster",
      },
      serviceHighlights: s.home.serviceHighlights,
      productCard: {
        product: "Produkt",
        explore: "Utforska produkten",
      },
    },
    products: {
      page: {
        title: s.products.page.title,
        description:
          "Utforska PrequaliQs produktsuite — Prequaliq Apps och Enterprise Hub.",
        heroTitle: s.products.page.subtitle,
        heroDescription: s.products.page.description,
        breadcrumb: "Produkter",
      },
      prequaliqApps: mergePrequaliqApps(s.products.prequaliqApps),
      enterpriseHub: mergeEnterpriseHub(s.products.enterpriseHub),
    },
    services: {
      page: {
        metadata: {
          title: s.services.page.title,
          description: s.services.page.description,
        },
        hero: {
          title: s.services.page.title,
          description: s.services.page.description,
          breadcrumb: s.nav.services,
        },
        relatedServices: {
          title: s.services.page.relatedTitle,
          description:
            "Utforska andra erbjudanden inom samma område som kan stödja ditt projekt.",
        },
        readMore: s.common.readMore,
        platformViews: "Plattformsvyer",
        overview: "Översikt",
        discussProject: "Diskutera ditt projekt",
        whatWeDeliver: "Det vi levererar",
        readyTitle: "Redo att komma igång?",
        readyDescription:
          "Berätta om dina mål så hjälper vi dig planera rätt approach för ditt projekt.",
        contactUs: s.common.contactUs,
        notFound: s.services.page.noServiceTitle,
      },
      categories: s.services.categories,
      items: Object.fromEntries(
        allServiceSlugs.map((slug) => {
          const item =
            s.services.items[slug as keyof typeof s.services.items] as SvServiceItem;
          return [
            slug,
            {
              title: item.title,
              shortDescription: item.shortDescription,
              description: item.description,
              features: item.features,
              category: item.category,
              menuDescription: item.menuDescription,
            },
          ];
        }),
      ) as unknown as Messages["services"]["items"],
    },
    contact: {
      page: {
        title: s.contact.title,
        subtitle: s.contact.subtitle,
        breadcrumb: s.contact.title,
        getInTouch: s.contact.contactDetailsTitle,
      },
      modal: {
        title: s.common.getStarted,
        subtitle: "Berätta om ditt projekt så återkommer vi till dig inom kort.",
      },
      form: {
        title: s.contact.formTitle,
        responseTime: "Vi svarar normalt inom 24 timmar.",
        labels: {
          fullName: s.contact.fields.name,
          emailAddress: s.contact.fields.email,
          company: s.contact.fields.company,
          subject: s.contact.fields.subject,
          message: s.contact.fields.message,
        },
        placeholders: {
          fullName: s.contact.placeholders.name,
          emailAddress: s.contact.placeholders.email,
          company: s.contact.placeholders.company,
          message: s.contact.placeholders.message,
        },
        options: {
          general: "Allmän förfrågan",
          applicationDevelopment: "Applikationsutveckling",
          cloudIntegration: "Moln och integration",
          aiAutomation: "AI och automatisering",
          partnership: "Dedikerade team och support",
          products: "Produktdemo",
        },
        submit: s.contact.submitButton,
        successTitle: s.contact.successTitle,
        successMessage: s.contact.successMessage,
        required: "*",
      },
    },
    team: {
      intro: s.team.intro,
      membersTitle: "Våra teammedlemmar",
      breadcrumb: s.nav.whoWeAre,
      members: s.team.members,
    },
    legal: {
      lastUpdatedLabel: "Senast uppdaterad:",
      privacy: s.legal.privacy,
      terms: s.legal.terms,
    },
  };
}

function mergePrequaliqApps(
  svProduct: (typeof sv.products.prequaliqApps),
): Messages["products"]["prequaliqApps"] {
  const base = en.products.prequaliqApps;
  return {
    ...base,
    ...svProduct,
    metadata: {
      title: "Prequaliq Apps — Leverantörskvalificering",
      description: svProduct.shortDescription,
    },
    swedenFocus: {
      ...base.swedenFocus,
      ...svProduct.swedenFocus,
      imageAlt: "Prequaliq Apps utvecklat i Sverige",
    },
    whatIsIt: {
      ...base.whatIsIt,
      ...svProduct.whatIsIt,
      eyebrow: "Leverantörskvalificering och dynamisk upphandling",
    },
    audiencesIntro: {
      title: "Två sidor av offentlig upphandling",
      description:
        "Prequaliq Apps betjänar både upphandlande myndigheter och leverantörer — med dedikerade verktyg och arbetsflöden för den svenska offentliga sektorn.",
    },
    featuresIntro: {
      eyebrow: "Plattformens kapacitet",
      title: "Så fungerar systemet",
    },
    qualificationProcess: {
      ...svProduct.qualificationProcess,
      description:
        "Från första ansökan till löpande efterlevnad — en tydlig väg för leverantörer in på den svenska offentliga upphandlingsmarknaden.",
      imageAlt: "Leverantörskvalificeringsprocess",
    },
    implementation: {
      ...base.implementation,
      ...svProduct.implementation,
      eyebrow: "I produktion",
      imageAlt: "Implementering av Prequaliq Apps i Sverige",
    },
    screenshotsIntro: {
      eyebrow: "Plattformsvyer",
      title: "Prequaliq Apps i praktiken",
      description:
        "Sök, kvalificera, upphandra — verktyg utformade för transparens och effektivitet i svensk offentlig upphandling.",
    },
    valuesIntro: { title: "Vår värdegrund" },
    cta: {
      title: "Intresserad av Prequaliq Apps?",
      description:
        "Oavsett om du är upphandlande myndighet eller leverantör i Sverige — kontakta oss för att lära dig hur plattformen kan stödja dina behov.",
      button: sv.common.contactUs,
    },
    heroImageAlt: "Prequaliq Apps — plattform för svensk offentlig upphandling",
    heroBadge: "Sverige",
  } as Messages["products"]["prequaliqApps"];
}

function mergeEnterpriseHub(
  svProduct: (typeof sv.products.enterpriseHub),
): Messages["products"]["enterpriseHub"] {
  const base = en.products.enterpriseHub;
  return {
    ...base,
    ...svProduct,
    metadata: {
      title: "Enterprise Hub — ERP-plattform",
      description: svProduct.shortDescription,
    },
    heroImageAlt: "Enterprise Hub ERP-plattform — översikt",
    whatIsErp: {
      ...base.whatIsErp,
      ...svProduct.whatIsErp,
      eyebrow: "Affärssystem (ERP)",
    },
    readyForImplementation: {
      ...base.readyForImplementation,
      ...svProduct.readyForImplementation,
      imageAlt: "Implementeringsplanering för Enterprise Hub",
    },
    modulesIntro: {
      eyebrow: "Integrerade moduler",
      title: "Allt sammankopplat i ett ERP-system",
      description:
        "Ekonomi, försäljning, inköp, lager och HR delar samma data — så beslut baseras på det som händer nu, inte förra veckans kalkylblad.",
    },
    implementations: {
      ...base.implementations,
      ...svProduct.implementations,
      eyebrow: "Referenser",
      imageAlt: "Framgångsrika ERP-implementeringar",
    },
    screenshotsIntro: {
      eyebrow: "Plattformsvyer",
      title: "Enterprise Hub i praktiken",
      description:
        "Ekonomi, försäljning, inköp och lager — samlade vyer som ger ledning och team det de behöver för att fatta beslut.",
    },
    cta: {
      title: "Redo att modernisera er verksamhetsstyrning?",
      description:
        "Kontakta oss för att diskutera hur Enterprise Hub kan anpassas, implementeras och stödja er organisation.",
      button: sv.common.contactUs,
    },
  } as Messages["products"]["enterpriseHub"];
}

export function getServiceMenuCategories(locale: Locale): ServiceMenuCategory[] {
  const t = getMessages(locale);

  return serviceCategoryStructure.map((cat) => ({
    title: t.services.categories[cat.id].title,
    description: t.services.categories[cat.id].description,
    image: cat.image,
    items: cat.slugs.map((slug) => {
      const items = t.services.items as ServiceItemRecord;
      const item = items[slug];
      const menuDescription = item.menuDescription;
      return {
        label: item.title,
        description: menuDescription ?? item.shortDescription,
        href: `/services/${slug}`,
      };
    }),
  }));
}

type ServiceItemRecord = Record<
  ServiceSlug,
  {
    title: string;
    shortDescription: string;
    description: string;
    features: readonly string[];
    category: string;
    menuDescription?: string;
  }
>;

export function getCatalogServices(locale: Locale) {
  const t = getMessages(locale);
  const items = t.services.items as ServiceItemRecord;

  return allServiceSlugs.map((slug) => {
    const item = items[slug];
    return {
      slug,
      title: item.title,
      shortDescription: item.shortDescription,
      description: item.description,
      features: [...item.features],
      category: item.category,
      image: serviceImages[slug],
    };
  });
}

export function getCatalogService(locale: Locale, slug: string) {
  return getCatalogServices(locale).find((s) => s.slug === slug);
}

export function getRelatedServices(locale: Locale, slug: string, limit = 3) {
  const current = getCatalogService(locale, slug);
  if (!current) return [];
  return getCatalogServices(locale)
    .filter((s) => s.category === current.category && s.slug !== slug)
    .slice(0, limit);
}

export function getNavLinks(locale: Locale) {
  const t = getMessages(locale);
  return [
    { label: t.nav.home, href: "/" },
    {
      label: t.nav.products,
      href: "/products",
      children: [
        { label: t.nav.prequaliqApps, href: "/products/prequaliq-apps" },
        { label: t.nav.enterpriseHub, href: "/products/enterprise-hub" },
      ],
    },
    { label: t.nav.services, href: "/services", megaMenu: true as const },
    {
      label: t.nav.whoWeAre,
      href: "/team",
      children: [{ label: t.nav.meetTheTeam, href: "/team" }],
    },
  ];
}

export function getFooterHelpLinks(locale: Locale) {
  const t = getMessages(locale);
  return [
    { label: t.footer.helpLinks.howItWorks, href: "/contact" as const },
    { label: t.footer.helpLinks.customerSupport, href: "/contact" as const },
    { label: t.footer.helpLinks.privacyPolicy, legal: "privacy" as const },
    { label: t.footer.helpLinks.termsConditions, legal: "terms" as const },
  ];
}

export function getFooterQuickLinks(locale: Locale) {
  const t = getMessages(locale);
  return [
    { label: t.footer.quickNav.home, href: "/" as const },
    { label: t.footer.quickNav.services, href: "/services" as const },
    { label: t.footer.quickNav.products, href: "/products" as const },
    { label: t.footer.quickNav.team, href: "/team" as const },
  ];
}

export function getHomeServiceHighlights(locale: Locale) {
  const t = getMessages(locale);
  const hrefs = [
    "/services/web-and-mobile-apps",
    "/services/cloud-solutions",
    "/services/ai-solutions",
    "/services/dedicated-teams",
  ];
  const icons = ["apps", "cloud", "ai", "team"];

  return t.home.serviceHighlights.map((item, i) => ({
    ...item,
    href: hrefs[i],
    icon: icons[i],
  }));
}

export function getProducts(locale: Locale) {
  const t = getMessages(locale);
  return [
    {
      slug: "prequaliq-apps",
      title: t.products.prequaliqApps.title,
      shortDescription: t.products.prequaliqApps.shortDescription,
    },
    {
      slug: "enterprise-hub",
      title: t.products.enterpriseHub.title,
      shortDescription: t.products.enterpriseHub.shortDescription,
    },
  ];
}
