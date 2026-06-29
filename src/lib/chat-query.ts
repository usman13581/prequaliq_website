import type { Locale } from "@/i18n/config";

/** Build one or more search queries — handles typos, short text, and topic hints. */
export function buildRetrievalQueries(message: string, locale: Locale): string[] {
  const trimmed = message.trim();
  if (!trimmed) return [];

  const lower = trimmed.toLowerCase();
  const queries = new Set<string>([trimmed]);

  const add = (q: string) => queries.add(q);

  if (/servic|tjänst|tjänster|offer|provid|erbjud|what\s+do\s+you/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ tjänster vad vi erbjuder web mobile cloud AI integration consulting"
        : "PrequaliQ services what we offer application development cloud AI integration consulting support",
    );
  }

  if (/\bcrm\b|customer\s*relationship|sales\s*force|pipeline|lead\s*manag/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ CRM Salesforce expertis anpassad mjukvara integration kundportal"
        : "PrequaliQ CRM Salesforce expertise custom software integration customer portal dedicated teams",
    );
  }

  if (/product|produk|prequaliq\s*apps|enterprise\s*hub|erp|plattform/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ produkter Prequaliq Apps Enterprise Hub ERP"
        : "PrequaliQ products Prequaliq Apps Enterprise Hub ERP platform",
    );
  }

  if (/expert|oracle|dotnet|\.net|salesforce|rails|kompetens|apex/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ expertis Oracle Microsoft Salesforce utveckling"
        : "PrequaliQ expertise Oracle Microsoft .NET Salesforce development",
    );
  }

  if (/contact|email|phone|kontakt|reach|call|info@|helpline|help\s*line|hotline|telefon|telephone|line\s*number|get\s*in\s*touch/i.test(lower)) {
    add("PrequaliQ contact email phone helpline address Djursholm Sweden info@prequaliq.com +46");
  }

  if (/team|who\s+are|medarbetare|consultant|staff|employee|people/i.test(lower)) {
    add("PrequaliQ team members consultants roles leadership");
  }

  if (/career|job|hiring|hire\s*me|vacanc|position|recruit|apply|cv|resume|opening|work\s*(for|with)\s*you|jobb|karriär|anställ|lediga/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ karriär jobb lediga tjänster ansök CV anställning"
        : "PrequaliQ careers jobs hiring open roles apply CV resume application",
    );
  }

  if (/price|pricing|cost|fee|rate|budget|quote|estimat|how\s*much|charge|pris|kostnad|offert|avgift/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ pris kostnad budget offert uppskattning samarbete tidslinje kontakt"
        : "PrequaliQ pricing cost budget estimate quote engagement timeline contact inquiry",
    );
  }

  if (/process|how\s*(do|does)\s*(you|it)\s*work|methodology|approach|deliver|engage|model|steps|workflow|arbets|tillväga|metod/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ process så arbetar vi samarbete modeller leverans steg"
        : "PrequaliQ process how we work engagement models delivery steps approach",
    );
  }

  if (/about|company|history|founded|background|story|located|where\s*are|stockholm|sweden|office|om\s*oss|företag|grundades|var\s*ligger|kontor/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ om oss företag historia grundades Stockholm Sverige kontor"
        : "PrequaliQ about company history founded Stockholm Sweden office story",
    );
  }

  if (/book|schedule|call|meeting|appointment|discovery|demo|hours|open|available|boka|möte|samtal|öppet|tider/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ boka introsamtal möte kontorstider vardagar Stockholm kontakt"
        : "PrequaliQ book discovery call meeting office hours weekdays Stockholm contact",
    );
  }

  if (/\bai\b|artificial|machine\s+learn|chatbot|ml\b/i.test(lower)) {
    add("PrequaliQ AI solutions artificial intelligence automation analytics");
  }

  if (/support|maintenance|maintain|after\s*launch|post[-\s]?launch|sla|monitor|ongoing|bug\s*fix|warranty|uptime|hypercare|underhåll|drift/i.test(lower)) {
    add(
      locale === "sv"
        ? "PrequaliQ underhåll och support drift övervakning SLA efter lansering"
        : "PrequaliQ maintenance and support operations monitoring SLA post-launch ongoing application support",
    );
  }

  if (/blog|article|insight|post/i.test(lower)) {
    add("PrequaliQ blog articles insights services technology");
  }

  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  if (wordCount <= 4) {
    add(
      locale === "sv"
        ? "PrequaliQ företag tjänster produkter expertis översikt"
        : "PrequaliQ company services products expertise overview",
    );
  }

  return [...queries];
}
