import type { Locale } from "@/i18n/config";

/** Build one or more search queries — e-procurement focused. */
export function buildRetrievalQueries(message: string, locale: Locale): string[] {
  const trimmed = message.trim();
  if (!trimmed) return [];

  const lower = trimmed.toLowerCase();
  const queries = new Set<string>([trimmed]);

  const add = (q: string) => queries.add(q);

  if (/servic|tjänst|offer|provid|erbjud|what\s+do\s+you|vad\s+erbjud/i.test(lower)) {
    add(
      locale === "sv"
        ? "Prequaliq e-upphandling plattform upphandlare leverantörer funktioner"
        : "Prequaliq e-procurement platform buyers suppliers features",
    );
  }

  if (/buyer|upphandlare|myndighet|kommun|region|contracting|public\s*buyer/i.test(lower)) {
    add(
      locale === "sv"
        ? "Prequaliq för upphandlare kommuner regioner myndigheter e-upphandling"
        : "Prequaliq for buyers municipalities regions authorities e-procurement",
    );
  }

  if (/supplier|leverantör|anbud|tender|bid/i.test(lower)) {
    add(
      locale === "sv"
        ? "Prequaliq för leverantörer kvalificering anbud offentlig sektor"
        : "Prequaliq for suppliers qualification tenders public sector",
    );
  }

  if (/product|produk|prequaliq|platform|plattform|e-?procur|e-?upphand|upphandling/i.test(lower)) {
    add(
      locale === "sv"
        ? "Prequaliq e-upphandlingssystem AI DIS kvalificering"
        : "Prequaliq e-procurement system AI DIS qualification",
    );
  }

  if (/qualif|kvalific|cpv|nuts|dis\b|dynamic/i.test(lower)) {
    add(
      locale === "sv"
        ? "Prequaliq leverantörskvalificering DIS CPV NUTS sök"
        : "Prequaliq supplier qualification DIS CPV NUTS search",
    );
  }

  if (/\bai\b|document|dokument|q&a|fråg|chat|livechatt/i.test(lower)) {
    add(
      locale === "sv"
        ? "Prequaliq AI dokument offentlig frågefunktion livechatt efter tilldelning"
        : "Prequaliq AI documents public Q&A live chat after award",
    );
  }

  if (/erp|enterprise\s*hub/i.test(lower)) {
    add(
      locale === "sv"
        ? "Enterprise Hub ERP erp.prequaliq.com separat från e-upphandling"
        : "Enterprise Hub ERP erp.prequaliq.com separate from e-procurement",
    );
  }

  if (/login|logga\s*in|sign\s*in|access\s*platform/i.test(lower)) {
    add("Prequaliq platform login https://prequaliq.up.railway.app/login");
  }

  if (/contact|email|phone|kontakt|reach|call|info@|helpline|telefon|get\s*in\s*touch/i.test(lower)) {
    add("PrequaliQ contact email phone helpline address Djursholm Sweden info@prequaliq.com +46");
  }

  if (/career|job|hiring|vacanc|apply|cv|jobb|karriär|anställ/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ karriär jobb lediga tjänster ansök CV"
        : "PrequaliQ careers jobs hiring apply CV",
    );
  }

  if (/price|pricing|cost|budget|quote|pris|kostnad|offert/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ pris kontakt demo e-upphandling försäljning"
        : "PrequaliQ pricing contact demo e-procurement sales",
    );
  }

  if (/about|company|om\s*oss|företag|stockholm|sweden|office|adress/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ om oss e-upphandling Sverige Djursholm kontakt"
        : "PrequaliQ about company e-procurement Sweden Djursholm contact",
    );
  }

  if (/blog|article|insight|insikt/i.test(lower)) {
    add("PrequaliQ blog insights e-procurement public sector");
  }

  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  if (wordCount <= 4) {
    add(
      locale === "sv"
        ? "Prequaliq e-upphandling upphandlare leverantörer översikt"
        : "Prequaliq e-procurement buyers suppliers overview",
    );
  }

  return [...queries];
}
