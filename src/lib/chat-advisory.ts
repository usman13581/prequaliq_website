import type { Locale } from "@/i18n/config";

/** Business / technology topics where we advise via related services — not hard refusal. */
const TECH_TOPIC =
  /\b(crm|erp|cms|portal|saas|api|integrat|cloud|mobile|web\s*app|software|platform|database|data\s*warehouse|analytics|automation|ai\b|machine\s*learn|oracle|salesforce|\.net|dotnet|rails|apex|devops|kubernetes|azure|aws|digital|system|develop|build|implement|moderniz|migrat|consult|expert|team|wms|inventory|procurement|finance|hr\b|hcm|e-commerce|ecommerce|shopify|wordpress|react|mobile\s*app|chatbot|rag\b|security|gdpr|enterprise)\b/i;

export function isTechnologyRelatedQuery(message: string): boolean {
  const text = message.trim();
  if (text.length < 2) return false;
  return TECH_TOPIC.test(text);
}

/** Fallback when no strong match — still answer from site overview. */
export function getGeneralSiteQueries(locale: Locale): string[] {
  if (locale === "sv") {
    return [
      "PrequaliQ företag tjänster produkter expertis översikt",
      "PrequaliQ kontakt anpassad mjukvara dedikerade team",
    ];
  }
  return [
    "PrequaliQ company services products expertise overview",
    "PrequaliQ contact custom software dedicated teams",
  ];
}

/** Extra retrieval queries when mapping a tech need to PrequaliQ capabilities. */
export function getAdvisoryRetrievalQueries(locale: Locale): string[] {
  if (locale === "sv") {
    return [
      "PrequaliQ kapacitet vägledning anpassad mjukvara dedikerade team expertis",
      "PrequaliQ custom software skräddarsydd utveckling integration",
      "PrequaliQ expertis Oracle Microsoft Salesforce web mobile",
    ];
  }
  return [
    "PrequaliQ capability guidance custom software dedicated experts",
    "PrequaliQ custom software tailored development integration workflows",
    "PrequaliQ expertise Oracle Microsoft Salesforce web mobile cloud",
  ];
}

export function getCapabilityBridgeBody(locale: Locale): string {
  if (locale === "sv") {
    return `PrequaliQ — vägledning för relaterade teknikbehov

PrequaliQ listar inte alltid varje teknik eller produktnamn som en egen sida (t.ex. ett fristående "CRM-erbjudande"). Så här ska du tolka vanliga behov:

- CRM, kundportaler, försäljningsstöd: Ingen separat CRM-produkt på webbplatsen. Salesforce-expertis, anpassad mjukvara och systemintegration kan stödja CRM-liknande lösningar. Rekommendera /expertise/salesforce och /services/custom-software samt kontakt.
- ERP och verksamhetssystem: Enterprise Hub är PrequaliQs ERP-plattform. Oracle-expertis och anpassad utveckling för övriga ERP-behov.
- Webb, mobil, portaler: Tjänsten Web & Mobile Applications och relaterad expertis.
- Integrationer och API: System Integration, Cloud Solutions, cloud-integration-apis expertis.
- AI, automatisering, analys: AI Solutions, Data & Analytics, samt bloggartiklar om AI.
- Behov som inte matchar en namngiven tjänst: Föreslå Custom Software Solutions, Dedicated Teams (hyra experter), IT Consulting och kontakt via /contact eller info@prequaliq.com.

Var ärlig: om något inte står uttryckligen i dokumentationen, säg det — men koppla alltid till närmaste verkliga kapabilitet och bjud in användaren att prata med teamet.`;
  }

  return `PrequaliQ — guidance for related technology needs

PrequaliQ does not always list every technology or product name as its own page (for example, a standalone "CRM service"). Use this when users ask about related topics:

- CRM, customer portals, sales tooling: There is no separate CRM product page on the website. Salesforce expertise, custom software, and system integration can support CRM-style solutions. Recommend /expertise/salesforce, /services/custom-software, and Contact.
- ERP and business systems: Enterprise Hub is PrequaliQ's ERP platform. Oracle expertise and custom development cover many other ERP-related needs.
- Web, mobile, portals: Web & Mobile Applications service and web-mobile expertise.
- Integrations and APIs: System Integration, Cloud Solutions, and cloud-integration-apis expertise.
- AI, automation, analytics: AI Solutions, Data & Analytics, and relevant blog content.
- Needs that do not match a named offering: Suggest Custom Software Solutions, Dedicated Teams (hire experts), IT Consulting, and Contact at /contact or info@prequaliq.com.

Be honest: if something is not explicitly documented, say so — but always connect to the closest real capability and invite the user to speak with the team.`;
}

/** Compact advisory rules injected into the system prompt (full bridge is indexed separately). */
export function buildTechnologyAdvisoryPreamble(locale: Locale): string {
  if (locale === "sv") {
    return `RÅDGIVNING — teknikrelaterade frågor:
- Om användaren nämner CRM, ERP, portaler, integrationer eller liknande utan exakt träff: förklara ärligt om det inte är en namngiven produkt, koppla till Custom Software, Dedicated Teams, relevant Expertis (t.ex. Salesforce för CRM), och bjud in till kontakt.`;
  }
  return `ADVISORY — technology-related questions:
- If the user mentions CRM, ERP, portals, integrations, or similar without an exact product match: explain honestly when it is not a named offering, connect to Custom Software, Dedicated Teams, relevant Expertise (e.g. Salesforce for CRM), and invite contact.`;
}
