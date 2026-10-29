import type { Locale } from "@/i18n/config";

/** Procurement / platform topics where we advise — not hard refusal. */
const TECH_TOPIC =
  /\b(procurement|e-?procurement|upphandling|e-?upphandling|tender|anbud|buyer|supplier|leverantör|upphandlare|qualification|kvalificering|dis\b|dynamic\s*purchas|cpv|nuts|ai\b|chat|q&a|contract|kontrakt|lou|luf|public\s*sector|offentlig|municipality|kommun|region|authority|myndighet|platform|plattform|login|erp|enterprise\s*hub)\b/i;

export function isTechnologyRelatedQuery(message: string): boolean {
  const text = message.trim();
  if (text.length < 2) return false;
  return TECH_TOPIC.test(text);
}

export function getGeneralSiteQueries(locale: Locale): string[] {
  if (locale === "sv") {
    return [
      "Prequaliq e-upphandling upphandlare leverantörer plattform översikt",
      "PrequaliQ kontakt e-upphandling kvalificering DIS AI",
    ];
  }
  return [
    "Prequaliq e-procurement buyers suppliers platform overview",
    "PrequaliQ contact e-procurement qualification DIS AI",
  ];
}

export function getAdvisoryRetrievalQueries(locale: Locale): string[] {
  if (locale === "sv") {
    return [
      "Prequaliq e-upphandling AI CPV NUTS kvalificering DIS",
      "Prequaliq upphandlare leverantörer frågefunktion livechatt",
      "PrequaliQ kontakt demo försäljning",
    ];
  }
  return [
    "Prequaliq e-procurement AI CPV NUTS qualification DIS",
    "Prequaliq buyers suppliers Q&A live chat after award",
    "PrequaliQ contact demo sales",
  ];
}

export function getCapabilityBridgeBody(locale: Locale): string {
  if (locale === "sv") {
    return `PrequaliQ — vägledning för e-upphandling

PrequaliQs webbplats handlar om Prequaliq, ett e-upphandlingssystem för svensk offentlig sektor.

- Upphandlare (kommuner, regioner, myndigheter): hela processen från marknadsanalys till kontrakt, sök leverantörer med CPV/NUTS/omsättning/nyckelord, AI för dokument, offentlig Q&A, livechatt efter tilldelning, DIS.
- Leverantörer: kvalificering, synlighet, AI-stöd i dokument, Q&A och livechatt efter tilldelning.
- ERP / Enterprise Hub: separat produkt på erp.prequaliq.com — nämn bara om användaren frågar om ERP.
- Inloggning: https://prequaliq.up.railway.app/login
- Kontakt: /contact eller info@prequaliq.com

Rekommendera inte äldre IT-konsulttjänster (anpassad mjukvara, dedikerade team, Oracle/Salesforce-konsulting) som huvuderbjudande.`;
  }

  return `PrequaliQ — guidance for e-procurement

The PrequaliQ website presents Prequaliq, an e-procurement system for the Swedish public sector.

- Buyers (municipalities, regions, authorities): full process from market research to contract; search suppliers by CPV/NUTS/turnover/keywords; AI for documents; public Q&A; live chat after award; DIS.
- Suppliers: qualification, visibility, AI document help, Q&A and live chat after award.
- ERP / Enterprise Hub: separate product at erp.prequaliq.com — mention only if the user asks about ERP.
- Login: https://prequaliq.up.railway.app/login
- Contact: /contact or info@prequaliq.com

Do not present legacy IT consulting services (custom software, dedicated teams, Oracle/Salesforce consulting) as the main offering.`;
}

export function buildTechnologyAdvisoryPreamble(locale: Locale): string {
  if (locale === "sv") {
    return `RÅDGIVNING:
- Håll fokuset på Prequaliq e-upphandling (upphandlare, leverantörer, kvalificering, DIS, AI, Q&A, livechatt).
- Nämn inte gamla tjänster som huvudlösning. ERP endast om användaren frågar (erp.prequaliq.com).`;
  }
  return `ADVISORY:
- Stay focused on Prequaliq e-procurement (buyers, suppliers, qualification, DIS, AI, Q&A, live chat).
- Do not pitch legacy consulting services. Mention ERP only if asked (erp.prequaliq.com).`;
}
