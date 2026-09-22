/** Crisp LinkedIn commentary per blog slug — 2-4 lines, posted above the article link card. */

/**
 * Hashtags and mentions must use LinkedIn's "little text" format, not plain text:
 *   hashtag: {hashtag|\#|AI}
 *   mention: @[Name](urn:li:organization:123)
 * Plain "#AI" renders as literal text without linking.
 *
 * @type {Record<string, string>}
 */
export const COMMENTARY_BY_SLUG = {
  "2026-dedicated-teams-ai-augmented-squads": `Clients stopped buying headcount in 2026. They started buying owned outcomes.

A squad of four now covers scope that used to need eight — but only where the team owns the backlog end to end, and every AI-assisted change still passes a named human reviewer.

What that changes about team composition, onboarding, and audit trails:`,

  "2026-web-and-mobile-ai-native-experiences": `The hard part of AI in a product interface is not the model. It is making the feature feel reliable.

Streamed responses, a visible escape hatch, and a deterministic path for the same task decide whether users adopt an assistant or quietly work around it.

How we build assistive surfaces on React 19 and Next.js:`,

  "2026-ai-solutions-enterprise-analytics": `"Analytics in hours, not quarters" only holds up if a CFO can defend the number.

Governed pipelines, certified datasets, and eval suites that run before every release are what separate an enterprise deployment from a demo.

Our approach to AI analytics leaders can stand behind:`,

  "2026-custom-software-ai-accelerated-delivery": `AI coding tools did not replace engineering judgment in 2026. They compressed the gap between a validated design and production code.

Architecture, threat modelling, and data ownership stayed human-led. Boilerplate, migrations, and test drafts did not.

Where the acceleration actually shows up:`,

  "2026-data-analytics-ai-pipelines": `One question decides whether an analytics programme worked: can your CFO and your engineer agree on the same number?

Semantic layers define revenue and churn once. AI then surfaces anomalies and drift instead of quietly breaking Monday's report.

How we build pipelines teams trust daily:`,

  "2026-it-consulting-ai-strategy-roadmaps": `Every board wanted AI in 2026. Few could absorb twenty parallel experiments.

The roadmaps that got funded sorted use cases into tiers — quick wins, platform bets, regulated programmes — each with a risk classification, an owner, and a metric.

What a fundable AI roadmap looks like:`,

  "2026-cloud-solutions-secure-ai-infra": `GPU spend became a FinOps line item in 2026, right next to compute and storage.

Private endpoints, token budgets, model routing, and EU data residency are now baseline requirements for running inference in production — not hardening you add later.

Patterns for cloud infrastructure that hosts AI safely:`,

  "2026-ui-ux-design-generative-interfaces": `Almost every enterprise app shipped an AI assist in 2026. Adoption split sharply between the ones users understood and the ones they avoided.

Label what was generated. Show the source. Keep a confirmation step on anything destructive. The patterns that work are unglamorous.

On designing assistance people actually trust:`,

  "2026-system-integration-agent-ready-apis": `Your integration layer has a demanding new consumer: AI agents that call at unpredictable times, in unpredictable orders, sometimes twice.

Idempotent writes, self-describing contracts, and scoped permissions are what keep a retried purchase order from becoming two.

What "agent-ready" means in practice:`,

  "2026-legacy-modernization-ai-assisted-rewrites": `AI can now read a 30-year-old COBOL batch job and explain it in an afternoon. That does not make switching it off any safer.

The highest-value use was documentation, not translation — a validated description of current behaviour, then characterisation tests that pin it down before anything moved.

How we modernise without downtime:`,

  "2026-maintenance-support-autonomous-operations": `Operations teams automated more of the night shift in 2026 than ever before — and learned exactly where to stop.

Agents that read telemetry and propose a cause save hours. Agents allowed to act unsupervised on production create a new class of incident.

Where we draw the line on autonomous remediation:`,
};

export function commentaryForSlug(slug) {
  return COMMENTARY_BY_SLUG[slug] ?? null;
}
