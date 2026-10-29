import type { Locale } from "./config";
import { en } from "./locales/en";
import { sv } from "./locales/sv";
import { expertiseSv } from "./locales/expertise-sv";
import {
  allServiceSlugs,
  serviceCategoryStructure,
  serviceImages,
  type ServiceSlug,
} from "./service-structure";
import { expertiseSlugs, type ExpertiseSlug } from "@/lib/expertise-structure";
import { getExpertiseImage, prequaliqAppsImages } from "@/lib/static-images";
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
      themeLight: "Byt till ljust läge",
      themeDark: "Byt till mörkt läge",
    },
    site: {
      ...en.site,
      logoTagline: s.site.logoTagline,
      tagline: s.site.tagline,
      description: s.site.description,
      topBar: "E-upphandling · Offentlig sektor · Sverige",
    },
    about: {
      page: {
        title: "Om PrequaliQ",
        description:
          "Vi bygger Sveriges AI-drivna plattform för offentlig upphandling — som sammanför köpare och leverantörer så att upphandling blir tydligare, rättvisare och enklare att driva.",
        breadcrumb: "Om oss",
        story: {
          eyebrow: "Vår historia",
          title: "Vi utvecklar offentlig upphandling så att organisationer kan fokusera på resultat",
          paragraph1:
            "PrequaliQ grundades i Stockholm 2022. Idag fokuserar vi på Prequaliq: en samlad, AI-stödd plattform för svenska myndigheter, kommuner, regioner och leverantörer. Varje dag publicerar offentliga köpare upphandlingar och leverantörer söker möjligheter — vi sammanför dem i ett system.",
          paragraph2:
            "Från marknadsanalys till signerat kontrakt kombinerar Prequaliq sökbar leverantörsdata (CPV, NUTS, omsättning, nyckelord), leverantörskvalificering och dynamiskt inköp (DIS), transparent offentlig Q&A och livechatt efter tilldelning — utformat för hur svensk offentlig upphandling fungerar enligt LOU och LUF.",
        },
        facts: [
          { value: "2022", label: "Grundat i Stockholm" },
          { value: "Hela flödet", label: "Marknadsanalys till kontrakt" },
          { value: "Två sidor", label: "Köpare och leverantörer på en plattform" },
        ],
        services: {
          eyebrow: "Vad vi bygger",
          title: "En plattform för offentliga köpare och leverantörer",
          description:
            "Prequaliq gör upphandlingar regelrätta och praktiska, samtidigt som varje leverantör till offentlig sektor får en rättvis väg att delta. Utforska hur båda sidorna av processen fungerar.",
          pillars: [
            {
              title: "För offentliga köpare",
              description:
                "Hantera hela upphandlingscykeln: hitta kvalificerade leverantörer, skriv med AI, håll Q&A transparent och samarbeta efter tilldelning via livechatt.",
              href: "/buyers",
              cta: "Utforska för upphandlare",
            },
            {
              title: "För leverantörer",
              description:
                "Bli kvalificerad, håll dig synlig för rätt möjligheter, skriv starkare dokument med AI och kommunicera tydligt via Q&A och chatt efter tilldelning.",
              href: "/suppliers",
              cta: "Utforska för leverantörer",
            },
            {
              title: "Öppna plattformen",
              description:
                "Logga in i Prequaliq för upphandlar- och leverantörsflöden, eller kontakta oss för en genomgång anpassad till er organisation.",
              href: "https://prequaliq.up.railway.app/login",
              cta: "Plattformsinloggning",
            },
          ],
        },
        cta: {
          title: "Vill du se Prequaliq i praktiken?",
          description: "Kontakta sälj för en demo, eller utforska karriär om du vill gå med i teamet.",
          contact: "Kontakta sälj",
          careers: "Visa karriär",
        },
      },
    },
    nav: {
      home: s.nav.home,
      products: s.nav.products,
      services: s.nav.services,
      expertise: s.nav.expertise,
      about: "Om oss",
      careers: "Karriär",
      blog: "Blogg",
      prequaliqApps: s.nav.prequaliqApps,
      enterpriseHub: s.nav.enterpriseHub,
      contact: "Kontakt",
      getStarted: s.common.getStarted,
    },
    footer: {
      ctaTitle: "Berätta vad du behöver",
      ctaSubtitle: "Anlita en expert, starta ett projekt eller diskutera en företagslösning.",
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
        about: "Om oss",
        services: s.footer.ourServices,
        expertise: s.footer.expertise,
        products: s.footer.ourProducts,
        careers: "Karriär",
        blog: "Blogg",
      },
    },
    home: {
      hero: {
        eyebrow: "Företagsteknologipartner",
        kicker: "Expertteam · Skräddarsydd mjukvara · ERP · Moln · Integration",
        title: "Vi stärker företag med",
        rotatingWords: [
          "expertdelivery",
          "skräddarsydda applikationer",
          "företagsplattformar",
          "molnintegration",
        ],
        titleHighlight: "",
        description:
          "Från dedikerade specialister och kompletta applikationer till ERP, integration och flersystemprogram — PrequaliQ kombinerar senior praktikansvarig ledning med hands-on engineering.",
        primaryCta: "Starta ett projekt",
        secondaryCta: "Utforska tjänster",
        stats: [
          { value: "2022", label: "Grundat", hint: "Stockholm, Sverige" },
          { value: "8", label: "Expertområden", hint: "Oracle, .NET, moln med mera" },
          { value: "2", label: "Live-plattformar", hint: "Prequaliq Apps & Enterprise Hub" },
          { value: "3", label: "Engagemangsmodeller", hint: "Experter, appar, helhet" },
        ],
        flowLabel: "Leveranssystem",
        flowSteps: ["Strategi", "Design", "Bygg", "Lansera", "Skala"],
        marquee: [
          "Dedikerade experter",
          "Webb- & mobilappar",
          "Företags-ERP",
          "Oracle Cloud",
          "Microsoft .NET",
          "Salesforce",
          "Systemintegration",
          "Legacy-modernisering",
          "AI & automation",
          "Data & analys",
        ],
        pills: ["Dedikerade experter", "Fullstack-leverans", "Företagsplattformar"],
      },
      proof: {
        eyebrow: "Leveransbevis",
        title: "Betrodd för företagssystem som måste fungera i produktion",
        description:
          "Vi samarbetar med organisationer som behöver mer än en broschyrsajt — interna plattformar, integrerade applikationer, ERP-utvidgningar och produkter byggda för daglig drift.",
        stats: [
          { value: "8", label: "Expertpraktiker", hint: "Var och en ledd av senior praktikansvarig" },
          { value: "11", label: "Tjänsteerbjudanden", hint: "Från appar till integration & support" },
          { value: "2", label: "Produkter på marknaden", hint: "Prequaliq Apps & Enterprise Hub" },
          { value: "3", label: "Sätt att engagera", hint: "Experter, applikationer, program" },
        ],
        outcomes: [
          "Seniora konsulter inbäddade i ert team eller som driver hela leveransen",
          "Djup kompetens inom Oracle, .NET, Salesforce, moln och integration",
          "Plattformar och applikationer vi driver — inte bara presentationer och överlämningar",
        ],
      },
      howWeWork: {
        eyebrow: "Så arbetar vi",
        title: "Från behov till leverans — tydligt strukturerat",
        description:
          "Vi klargör vad du behöver, matchar rätt kompetens från vår bänk och levererar med senior praktikansvarig ledning.",
        steps: [
          {
            step: "01",
            title: "Förstå",
            description:
              "Vi klargör ditt behov — extra experter, en komplett applikation eller ett företagsprogram.",
          },
          {
            step: "02",
            title: "Matcha",
            description:
              "Vi tilldelar rätt kompetens: Oracle, .NET, moln, integration, Salesforce med mera.",
          },
          {
            step: "03",
            title: "Leverera",
            description:
              "Dedikerade resurser eller helhetsleverans, ledd av en senior praktikansvarig för ditt område.",
          },
        ],
      },
      expertise: {
        eyebrow: "Vår expertis",
        title: "Djup kompetens inom företags- och moderna stackar",
        description:
          "Utforska våra praktikområden — varje med seniora ledare och detaljerad teknisk kapacitet.",
      },
      serviceModels: {
        eyebrow: "Hur vi hjälper",
        title: "Tre sätt att arbeta med oss",
        description: "Välj engagemangsmodell som passar er organisation.",
        items: [
          {
            title: "Anlita dedikerade experter",
            description:
              "Lägg till seniora konsulter i ert team — Oracle, .NET, Rails, Salesforce, moln med mera.",
            href: "/expertise",
            cta: "Utforska expertis",
          },
          {
            title: "Bygg en komplett applikation",
            description:
              "Webb, mobil och skräddarsydd programvara — från krav till design, bygg och release.",
            href: "/services/web-and-mobile-apps",
            cta: "Applikationstjänster",
          },
          {
            title: "Företag helhetslösning",
            description:
              "ERP, integration, modernisering och flersystemsprogram med expertleverans.",
            href: "/services",
            cta: "Företagstjänster",
          },
        ],
      },
      platforms: {
        eyebrow: "Våra plattformar",
        title: "Bevisade system vi driver",
        description:
          "Två plattformar vi byggt och driver — bevis på vår förmåga att leverera i produktion.",
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
        meetTeam: s.nav.expertise,
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
    expertise: expertiseSv as unknown as Messages["expertise"],
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
        title: "Kontakt",
        subtitle: "Prata med oss om Prequaliq för er organisation",
        breadcrumb: "Kontakt",
        getInTouch: s.contact.contactDetailsTitle,
      },
      modal: {
        title: "Kontakta sälj",
        subtitle: "Berätta om er organisation — vi återkommer inom en arbetsdag.",
      },
      form: {
        title: s.contact.formTitle,
        responseTime: "Vi svarar normalt inom en arbetsdag.",
        labels: {
          fullName: s.contact.fields.name,
          emailAddress: s.contact.fields.email,
          company: "Organisation",
          intent: "Jag är intresserad av",
          expertiseArea: "Intresseområde",
          message: s.contact.fields.message,
        },
        placeholders: {
          fullName: "Ditt fullständiga namn",
          emailAddress: "namn@organisation.se",
          company: "Myndighet, kommun eller företag",
          message:
            "Berätta om ni är köpare eller leverantör, och vad ni vill diskutera…",
        },
        options: {
          general: "Allmän förfrågan",
          hireExpert: "Demo för upphandlande myndigheter",
          buildApp: "Leverantörskvalificering / åtkomst",
          enterprise: "Pris och licens",
          product: "Genomgång av plattformen",
          expertiseUnsure: "Osäker ännu",
        },
        submit: s.contact.submitButton,
        submitting: "Skickar…",
        successTitle: s.contact.successTitle,
        successMessage: s.contact.successMessage,
        errorTitle: s.contact.errorTitle,
        errorMessage: s.contact.errorMessage,
        required: "*",
      },
    },
    careers: {
      page: {
        title: "Karriär",
        description:
          "Intresserad av att arbeta med PrequaliQ? Skicka din profil så hör vi av oss när det finns en match.",
        breadcrumb: "Karriär",
        eyebrow: "Bli en av oss",
        introTitle: "Skicka din profil",
        introDescription:
          "Ladda upp ditt CV och en kort notering om dig själv. Vi granskar varje ansökan och kontaktar dig när det finns en lämplig möjlighet.",
        highlights: [],
      },
      form: {
        ...en.careers.form,
        title: "Skicka din profil",
        subtitle: "Ladda upp ditt CV och berätta kort om dig själv. PDF eller Word, max 5 MB.",
        labels: {
          ...en.careers.form.labels,
          fullName: "Fullständigt namn",
          emailAddress: "E-postadress",
          phone: "Telefon",
          linkedIn: "LinkedIn-profil",
          message: "Personligt meddelande",
          cv: "CV",
        },
        placeholders: {
          ...en.careers.form.placeholders,
          fullName: "Ditt fullständiga namn",
          emailAddress: "dig@epost.se",
          phone: "+46 …",
          linkedIn: "https://linkedin.com/in/…",
          message: "En kort notering om din bakgrund och intressen…",
          cv: "Välj PDF- eller Word-fil…",
        },
        cvHint: "Godkända format: PDF, DOC, DOCX — max 5 MB.",
        submit: "Skicka profil",
        submitting: "Skickar…",
        successTitle: "Profil mottagen",
        successMessage:
          "Tack — vi granskar din profil och hör av oss om det finns en lämplig möjlighet.",
        errorTitle: "Kunde inte skicka",
        errorMessage: "Något gick fel. Försök igen eller mejla oss på info@prequaliq.com.",
      },
    },
    pricing: {
      page: {
        title: "Priser",
        description:
          "Välj Basic eller Advanced utifrån era behov. Skapa ett gratis leverantörskonto för att börja — hantera prenumeration i appen efter trial.",
        breadcrumb: "Priser",
        eyebrow: "Paket",
        introTitle: "Välj din prenumerationsnivå",
        introDescription:
          "Börja med ett gratis konto. Efter registrering och inloggning kan ni fortsätta på trial och uppgradera i appen när ni är redo — inget säljsamtal krävs för att komma igång.",
        plans: [
          {
            id: "basic",
            name: "Basic",
            badge: "Börja här",
            priceLabel: "Gratis att skapa konto",
            priceHint: "Trial ingår · uppgradera i appen",
            description:
              "Sök och följ offentliga möjligheter, slutför kvalificering och använd grundläggande kommunikationsverktyg.",
            cta: "Skapa gratis konto",
            ctaHref: "register",
            featured: false,
          },
          {
            id: "advanced",
            name: "Advanced",
            badge: "Mest kapabel",
            priceLabel: "Uppgradera i appen",
            priceHint: "Efter trial · full AI- och DIS-verktygslåda",
            description:
              "Allt i Basic, plus starkare AI-stöd, rikare synlighet för leverantörer och dynamiska inköpsflöden.",
            cta: "Skapa gratis konto",
            ctaHref: "register",
            featured: true,
          },
        ],
        compareTitle: "Jämför paketen",
        compareSubtitle: "Osäker på vad du ska välja? Utforska funktionslistan i detalj.",
        featureGroups: [
          {
            name: "Upptäckt och synlighet",
            rows: [
              { feature: "Skapa gratis leverantörskonto", basic: true, advanced: true },
              { feature: "Leverantörsprofil och kvalificeringsansökan", basic: true, advanced: true },
              { feature: "Sökbar för köpare (CPV, NUTS, omsättning, nyckelord)", basic: true, advanced: true },
              { feature: "Prioriterad synlighet i köparens sökresultat", basic: false, advanced: true },
              { feature: "Tidiga signaler och sparade sökningar", basic: false, advanced: true },
            ],
          },
          {
            name: "Upphandling och dokument",
            rows: [
              { feature: "Tillgång till publicerade upphandlingsdokument", basic: true, advanced: true },
              { feature: "Deltagande i offentlig Q&A", basic: true, advanced: true },
              { feature: "AI-stöd för dokument", basic: "Begränsat", advanced: true },
              { feature: "AI-sammanfattningar av upphandlingspaket", basic: false, advanced: true },
              { feature: "Teamsamarbete kring möjligheter", basic: false, advanced: true },
            ],
          },
          {
            name: "Kvalificering och DIS",
            rows: [
              { feature: "Onlinekvalificering och statusspårning", basic: true, advanced: true },
              { feature: "Påminnelser om årlig omprövning", basic: true, advanced: true },
              { feature: "Deltagande i dynamiskt inköp (DIS)", basic: false, advanced: true },
              { feature: "Avancerad arbetsyta för intyg och efterlevnad", basic: false, advanced: true },
            ],
          },
          {
            name: "Kommunikation och support",
            rows: [
              { feature: "Livechatt efter tilldelning med köpare", basic: true, advanced: true },
              { feature: "E-postaviseringar", basic: true, advanced: true },
              { feature: "Prioriterad support", basic: false, advanced: true },
              { feature: "Onboardingstöd för växande team", basic: false, advanced: true },
            ],
          },
        ],
        note: "Skapa ditt gratis konto via registrering. Efter signup och inloggning hanteras prenumeration och trial-uppgraderingar inne i Prequaliq-appen.",
        buyerNote: "Offentliga köpare: kontakta sälj för organisationslicens och utrullning.",
        ctaTitle: "Börja med ett gratis konto",
        ctaDescription:
          "Registrera dig som leverantör, utforska plattformen på trial och uppgradera till Advanced i appen när ni behöver hela verktygslådan.",
        ctaButton: "Skapa gratis konto",
        buyerCta: "Kontakta sälj för köpare",
      },
    },
    blog: {
      page: {
        ...en.blog.page,
        title: "Insikter",
        description:
          "Artiklar om svensk offentlig e-upphandling, Prequaliq-uppdateringar och praktisk vägledning för köpare och leverantörer.",
        breadcrumb: "Insikter",
        emptyTitle: "Insikter kommer snart",
        emptyDescription:
          "Vi förbereder nya artiklar om offentlig e-upphandling och Prequaliq-plattformen. Kom tillbaka snart — eller kontakta oss om du vill diskutera ett specifikt ämne.",
        searchPlaceholder: "Sök titel eller nyckelord…",
        allYears: "Alla år",
        showingCount: "Visar {visible} av {total} artiklar",
        noResultsTitle: "Inga artiklar hittades",
        noResultsDescription: "Prova ett annat nyckelord eller år.",
        clearFilters: "Rensa filter",
        featuredLabel: "Senaste insikten",
        topResult: "Bästa träff",
        allArticles: "Alla artiklar",
        readTime: "{min} min läsning",
        onThisPage: "På denna sida",
        relatedFromYear: "Mer från {year}",
        relatedArticles: "Relaterade artiklar",
      },
    },
    chat: {
      widget: {
        ...en.chat.widget,
        openLabel: "Fråga PrequaliQ AI",
        title: "PrequaliQ-assistenten",
        subtitle: "Fråga om Prequaliq e-upphandling för upphandlare och leverantörer.",
        placeholder: "Fråga om e-upphandling, upphandlare, leverantörer…",
        send: "Skicka",
        close: "Stäng",
        thinking: "Tänker…",
        sources: "Läs mer",
        suggested: [
          "Vad är Prequaliq?",
          "Hur hjälper det upphandlare?",
          "Hur kvalificerar sig leverantörer?",
          "Hur kontaktar jag PrequaliQ?",
        ],
        disclaimer:
          "Svar baseras endast på PrequaliQs dokumentation. För demo och försäljning, använd Kontakt eller info@prequaliq.com.",
        error: "Något gick fel. Försök igen.",
        notReady: "Assistenten förbereds. Kontakta info@prequaliq.com så länge.",
      },
    },
    team: {
      intro: s.team.intro,
      membersTitle: "Våra teammedlemmar",
      breadcrumb: s.nav.expertise,
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
    title: "E-upphandlingssystem",
    pageTitle: "Prequaliq - E-upphandlingssystem",
    metadata: {
      title: "Prequaliq - E-upphandlingssystem",
      description: svProduct.shortDescription,
    },
    swedenFocus: {
      ...base.swedenFocus,
      ...svProduct.swedenFocus,
      imageAlt: "Prequaliq Apps utvecklat för svensk e-upphandling",
    },
    whatIsIt: {
      ...base.whatIsIt,
      ...svProduct.whatIsIt,
      eyebrow: "Leverantörskvalificering och dynamisk upphandling",
    },
    audiencesIntro: {
      title: "Två sidor av offentlig upphandling",
      description:
        "Prequaliq Apps betjänar både upphandlande myndigheter och leverantörer — med dedikerade verktyg, AI-stöd och arbetsflöden för svensk offentlig e-upphandling.",
    },
    featuresIntro: {
      eyebrow: "Plattformens kapacitet",
      title: "Så fungerar systemet",
    },
    qualificationProcess: {
      ...base.qualificationProcess,
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
        "Sök, kvalificera, upphandra och kommunicera — verktyg för transparens och effektivitet i svensk offentlig e-upphandling.",
    },
    valuesIntro: { title: "Vår värdegrund" },
    cta: {
      title: "Intresserad av Prequaliq Apps?",
      description:
        "Oavsett om du är upphandlande myndighet eller leverantör i Sverige — kontakta oss för att se hur e-upphandlingssystemet kan stödja dina behov.",
      button: sv.common.contactUs,
    },
    heroImageAlt: "Prequaliq Apps — e-upphandlingssystem för svensk offentlig sektor",
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
      freeTrial: "Starta gratis provperiod",
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

function getProductsMenuCategory(locale: Locale): ServiceMenuCategory {
  const t = getMessages(locale);

  return {
    title: t.services.categories.products.title,
    description: t.services.categories.products.description,
    image: prequaliqAppsImages.hero,
    items: getProducts(locale).map((product) => ({
      label: product.title,
      description: product.shortDescription,
      href: `/products/${product.slug}`,
    })),
  };
}

/** Services mega menu — service categories plus products submenu */
export function getServicesMegaMenuCategories(locale: Locale): ServiceMenuCategory[] {
  return [...getServiceMenuCategories(locale), getProductsMenuCategory(locale)];
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
    { label: t.nav.services, href: "/services", megaMenu: true as const },
    { label: t.nav.expertise, href: "/expertise", expertiseMenu: true as const },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.careers, href: "/careers" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/contact" },
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
    { label: t.footer.quickNav.about, href: "/about" as const },
    { label: t.footer.quickNav.services, href: "/services" as const },
    { label: t.footer.quickNav.expertise, href: "/expertise" as const },
    { label: t.footer.quickNav.products, href: "/products" as const },
    { label: t.footer.quickNav.careers, href: "/careers" as const },
    { label: t.footer.quickNav.blog, href: "/blog" as const },
  ];
}

type ExpertiseItemRecord = Record<
  ExpertiseSlug,
  {
    title: string;
    shortDescription: string;
    heroDescription: string;
    delivers: readonly string[];
    stackGroups: readonly { title: string; items: readonly string[] }[];
    engagements: readonly { title: string; description: string }[];
    cta: string;
  }
>;

export function getExpertiseCatalog(locale: Locale) {
  const t = getMessages(locale);
  const items = t.expertise.items as ExpertiseItemRecord;

  return expertiseSlugs.map((slug) => {
    const item = items[slug];
    const stackPreview = item.stackGroups.flatMap((g) => g.items).slice(0, 4);
    return {
      slug,
      title: item.title,
      shortDescription: item.shortDescription,
      heroDescription: item.heroDescription,
      image: getExpertiseImage(slug),
      delivers: [...item.delivers],
      stackGroups: item.stackGroups.map((g) => ({
        title: g.title,
        items: [...g.items],
      })),
      engagements: item.engagements.map((e) => ({ ...e })),
      cta: item.cta,
      stackPreview,
    };
  });
}

export function getExpertiseItem(locale: Locale, slug: string) {
  return getExpertiseCatalog(locale).find((item) => item.slug === slug);
}

export function getRelatedExpertise(locale: Locale, slug: string, limit = 3) {
  return getExpertiseCatalog(locale)
    .filter((item) => item.slug !== slug)
    .slice(0, limit);
}

export function getExpertiseMenuItems(locale: Locale) {
  const t = getMessages(locale);
  const items = t.expertise.items as ExpertiseItemRecord;
  return expertiseSlugs.map((slug) => ({
    slug,
    label: items[slug].title,
  }));
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
