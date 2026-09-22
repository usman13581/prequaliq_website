/** 2026 service blog posts — selected services, weekday publish times 09:00–17:00 Stockholm. */
export const blogPosts = [
  {
    slug: "2026-dedicated-teams-ai-augmented-squads",
    serviceSlug: "dedicated-teams",
    publishedAt: "2026-01-09T09:45:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    title: "Dedicated Teams: AI-Augmented Squads That Own Outcomes",
    excerpt:
      "Nearshore squads paired with AI assistants delivered more per sprint in 2026 — provided ownership, review culture, and security boundaries stayed human.",
    content: `
<p>Dedicated teams changed shape in 2026. Clients stopped buying headcount and started buying <strong>owned outcomes</strong>: a squad accountable for a product area, measured on delivered business results rather than hours logged. AI assistants raised the output of each engineer, which made composition and accountability matter more, not less.</p>
<h2>Smaller squads, wider scope</h2>
<p>A typical squad ran leaner — a lead engineer, two or three developers, a designer sharing time, and a QA specialist — while covering scope that previously needed twice the people. AI handled scaffolding, test drafting, and migration chores. Engineers spent their attention on domain modelling, integration edge cases, and the review bar. Velocity gains only held where the team owned the backlog end to end instead of receiving pre-sliced tickets.</p>
<h2>Review culture as the control</h2>
<p>The teams that stayed reliable treated every AI-assisted change like any other contribution: pull request, tests, and a named human reviewer. Prompt libraries and internal agent configurations became shared assets, versioned alongside code. Onboarding shifted to explaining <em>why</em> the domain worked a certain way, since the mechanics of the codebase were increasingly self-documenting.</p>
<h2>Trust, security, and continuity</h2>
<p>Enterprise clients required approved AI gateways, prohibition of regulated data in public models, and audit logs covering assistant usage. Overlapping working hours with Stockholm, documented decisions, and rotation plans protected continuity when individuals moved on. Knowledge lived in ADRs and runbooks rather than in one engineer's memory.</p>
<p>PrequaliQ assembles dedicated teams that own delivery outcomes — AI-augmented for speed, and governed so that speed remains defensible.</p>
`,
  },
  {
    slug: "2026-web-and-mobile-ai-native-experiences",
    serviceSlug: "web-and-mobile-apps",
    publishedAt: "2026-01-21T14:20:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=1400&q=80",
    title: "Web & Mobile: AI-Native Experiences Users Can Rely On",
    excerpt:
      "React 19, Next.js server components, and streaming AI interfaces made assistive features feel native — when latency, fallbacks, and privacy were designed in.",
    content: `
<p>Web and mobile products in 2026 shipped AI as a feature of the interface, not a bolted-on chat bubble. Search boxes explained results, forms pre-filled from uploaded documents, and dashboards summarised what changed since a user last visited. The engineering challenge was less about models and more about <strong>perceived reliability</strong>.</p>
<h2>Streaming, server-first architectures</h2>
<p><strong>React 19</strong> and <strong>Next.js</strong> server components kept AI calls on the server, where API keys, rate limits, and retrieval logic belonged. Streamed responses let interfaces render partial answers immediately instead of showing spinners for seconds. Suspense boundaries and optimistic updates meant a slow model degraded one panel rather than blocking a page.</p>
<h2>Designing for wrong answers</h2>
<p>Every assistive surface shipped with an escape hatch: citations users could open, an obvious way to edit generated text, and a deterministic path for the same task. Teams measured acceptance rate and correction rate per feature, then removed the features nobody trusted. Offline and low-bandwidth behaviour was specified for mobile — cached results and queued requests instead of error toasts.</p>
<h2>Privacy and performance budgets</h2>
<p>Consent copy stated plainly what left the device and what was retained. On-device and small models handled classification and redaction before anything reached a hosted endpoint. Core Web Vitals budgets applied to AI-enhanced pages too, so assistive features could not quietly ruin the metrics the business tracked. Accessibility testing covered generated content, including screen-reader announcements for streamed text.</p>
<p>PrequaliQ builds web and mobile applications where AI features feel native, fast, and honest about their limits — on stacks your team can maintain.</p>
`,
  },
  {
    slug: "2026-ai-solutions-enterprise-analytics",
    serviceSlug: "ai-solutions",
    publishedAt: "2026-02-04T09:30:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=80",
    title: "AI Solutions: Enterprise Analytics That Ships Fast and Secure",
    excerpt:
      "How custom AI models and governed pipelines gave enterprises analytics in hours — not quarters — while meeting EU AI Act and security baselines in 2026.",
    content: `
<p>In 2026, enterprise leaders stopped treating AI analytics as a separate science project. The organisations that moved fastest built <strong>domain-specific models</strong> and retrieval layers on top of data they already trusted — then exposed answers inside CRMs, ERPs, and operational dashboards where decisions actually happened.</p>
<h2>Fast without being reckless</h2>
<p>Speed came from reusable patterns: semantic layers, certified datasets, and <strong>RAG</strong> pipelines that grounded every response in approved sources. Teams paired small language models with larger models only where nuance demanded it, keeping latency and cost predictable. <strong>Eval suites</strong> ran before every release — measuring accuracy, hallucination rate, and refusal behaviour on real enterprise questions.</p>
<h2>Secure and reliable by design</h2>
<p>Role-based access, column-level masking, and private VPC endpoints kept sensitive finance and HR data inside policy boundaries. <strong>Guardrails</strong> blocked prompt injection and off-topic exports. Audit logs captured who asked what, which sources were cited, and when human reviewers overrode an automated suggestion — essential for <strong>EU AI Act</strong> documentation in high-risk use cases.</p>
<h2>Operational AI, not demo chat</h2>
<p>Production deployments connected to ticketing, forecasting, and compliance workflows through <strong>MCP</strong> connectors with explicit approval gates. MLOps pipelines versioned training data, model weights, and prompt templates so rollbacks were minutes, not weeks.</p>
<p>PrequaliQ builds enterprise AI analytics that leaders can defend — fast to iterate, secure to operate, and reliable enough to embed in daily business rhythm.</p>
`,
  },
  {
    slug: "2026-custom-software-ai-accelerated-delivery",
    serviceSlug: "custom-software",
    publishedAt: "2026-03-18T11:15:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1400&q=80",
    title: "Custom Software: AI Tools Accelerating Mature Delivery",
    excerpt:
      "Cursor, Copilot, and agentic workflows helped teams ship bespoke .NET and TypeScript products faster — with stronger tests and clearer architecture in 2026.",
    content: `
<p>Custom software in 2026 reached a new maturity curve. AI development tools did not replace engineering judgment — they compressed the gap between validated design and production-ready code. Teams that treated <strong>Cursor</strong>, <strong>GitHub Copilot</strong>, and internal agents as disciplined assistants delivered complex workflows in weeks that once took quarters.</p>
<h2>Where acceleration showed up</h2>
<p>Boilerplate generation, API scaffolding, and migration scripts moved faster with AI pair programming — always reviewed in pull requests with the same bar as human-written code. Agents drafted integration tests from OpenAPI specs and caught edge cases early. Domain experts paired with engineers in shared sessions, refining business rules while assistants handled repetitive typing and refactors.</p>
<h2>Architecture stayed human-led</h2>
<p>Successful programmes kept architects in the loop for bounded contexts, security boundaries, and data ownership. AI suggestions sped implementation of <strong>.NET 10</strong> services and <strong>TypeScript</strong> frontends, but threat modelling, idempotent APIs, and staged rollouts remained deliberate choices. Documentation and ADRs were generated as drafts, then edited — not blindly merged.</p>
<h2>Governance in the loop</h2>
<p>Enterprises required licence policies, secret scanning, and prohibition of pasting regulated data into public models. Internal gateways routed agent requests through approved endpoints with logging. EU AI Act readiness influenced how some modules documented automated decision paths from the first sprint.</p>
<p>PrequaliQ delivers custom software with AI-accelerated velocity and enterprise-grade discipline — so speed never trades away maintainability.</p>
`,
  },
  {
    slug: "2026-data-analytics-ai-pipelines",
    serviceSlug: "data-analytics",
    publishedAt: "2026-04-22T14:40:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1400&q=80",
    title: "Data & Analytics: AI Pipelines for Trusted Enterprise Insights",
    excerpt:
      "Lakehouse analytics, semantic KPIs, and AI-assisted data quality gave enterprises near-real-time answers they could audit in 2026.",
    content: `
<p>Data and analytics programmes in 2026 were judged on one question: can a CFO and an engineer agree on the same number? AI strengthened pipelines — not by bypassing governance, but by surfacing anomalies, suggesting lineage fixes, and translating natural-language questions into validated SQL behind the scenes.</p>
<h2>AI-native analytics stacks</h2>
<p>Lakehouse platforms and <strong>dbt</strong> transformations remained the backbone. On top, <strong>semantic layers</strong> defined revenue, churn, and utilisation once — consumed by Power BI, notebooks, and conversational interfaces alike. <strong>RAG</strong> over certified metric definitions stopped dashboards from diverging into conflicting versions of truth.</p>
<h2>Quality and observability</h2>
<p>AI-assisted profiling flagged schema drift, null spikes, and broken upstream feeds before executives opened Monday reports. Column-level lineage and access policies satisfied GDPR and internal audit. For regulated insights, <strong>eval harnesses</strong> tested whether generated summaries matched source aggregates within tolerance.</p>
<h2>From batch to actionable</h2>
<p>Streaming ingestion and edge aggregation reduced latency for operations teams. Small models summarised shift logs and support queues inside secure enclaves, complementing — not replacing — traditional BI. Human analysts reviewed exceptions; automation handled volume.</p>
<p>PrequaliQ connects source systems, models data responsibly, and builds AI-augmented analytics pipelines that teams trust for daily decisions.</p>
`,
  },
  {
    slug: "2026-it-consulting-ai-strategy-roadmaps",
    serviceSlug: "it-consulting",
    publishedAt: "2026-05-14T10:05:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1400&q=80",
    title: "IT Consulting: AI Strategy Roadmaps for Regulated Enterprises",
    excerpt:
      "Practical AI roadmaps — use-case tiers, EU AI Act alignment, and platform choices — helped boards fund what mattered in 2026.",
    content: `
<p>IT consulting in 2026 centred on prioritisation. Every board wanted AI; few could absorb twenty parallel experiments. Consultants who delivered value mapped <strong>use-case tiers</strong> — quick wins, platform bets, and regulated programmes — each with explicit risk classification, owner, and success metrics.</p>
<h2>Assessment and architecture</h2>
<p>Current-state reviews covered data readiness, integration debt, and identity posture alongside application portfolios. Target architectures defined where agents could act autonomously, where <strong>human-in-the-loop</strong> was mandatory, and which workloads belonged on private AI gateways versus hyperscaler managed services. Zero Trust and secrets management were prerequisites, not afterthoughts.</p>
<h2>EU AI Act and vendor fit</h2>
<p>Roadmaps included documentation templates for high-risk systems: training data provenance, monitoring plans, and incident response. Honest fit-gap analysis compared Oracle, Microsoft, Salesforce, and bespoke estates — with <strong>MCP</strong> standards reducing lock-in for agent tooling. Proof-of-concepts de-risked spend before multi-year commitments.</p>
<h2>Programme governance</h2>
<p>Steering groups tracked KPIs tied to revenue, cost, and compliance — not vanity adoption charts. Change management prepared operations for new workflows augmented by AI analytics and coding assistants. Consultants fluent in finance and legal language helped sponsors defend investment when priorities shifted mid-year.</p>
<p>PrequaliQ consulting engagements produce actionable AI strategy roadmaps — what to ship first, what to defer, and how to measure accountable progress.</p>
`,
  },
  {
    slug: "2026-cloud-solutions-secure-ai-infra",
    serviceSlug: "cloud-solutions",
    publishedAt: "2026-06-09T16:30:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80",
    title: "Cloud Solutions: Secure Infrastructure for Production AI",
    excerpt:
      "Private endpoints, GPU FinOps, and EU-resident model serving made cloud the default home for enterprise AI workloads in 2026.",
    content: `
<p>Cloud platforms in 2026 were the practical home for production AI — not because hype demanded it, but because security, scale, and operational tooling matured together. European enterprises ran hybrid estates where inference, training, and analytics shared consistent identity, logging, and cost attribution.</p>
<h2>Secure AI infrastructure patterns</h2>
<p><strong>Private endpoints</strong>, workload identity, and network segmentation kept model APIs off the public internet. Secrets rotated through vaults; prompts and outputs logged to immutable stores for audit. <strong>Kubernetes</strong> on AKS and EKS hosted both traditional microservices and GPU-backed inference pods with autoscaling tuned to business hours.</p>
<h2>FinOps for GPU and tokens</h2>
<p>AI spend joined traditional cloud FinOps. Teams tagged GPU nodes, reserved capacity for baseline inference, and burst to serverless where latency allowed. Token budgets and model routing — smaller models first, larger only on escalation — kept monthly bills predictable. Sustainability metrics sat beside cost dashboards for leadership reviews.</p>
<h2>Compliance-ready operations</h2>
<p>EU data residency, encryption in transit and at rest, and backup policies applied equally to vector indexes and relational stores. <strong>Guardrails</strong> at the gateway enforced content policy before requests reached foundation models. Runbooks covered model deprecation, failover regions, and coordinated patches — the same discipline as any business-critical service.</p>
<p>PrequaliQ designs cloud infrastructure where enterprise AI runs safely — compliant, observable, and cost-aware from the first deployment.</p>
`,
  },
  {
    slug: "2026-ui-ux-design-generative-interfaces",
    serviceSlug: "ui-ux-design",
    publishedAt: "2026-07-07T10:50:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=1400&q=80",
    title: "UI/UX Design: Generative Interfaces People Actually Trust",
    excerpt:
      "Design systems, transparency patterns, and accessibility discipline decided which AI-assisted interfaces users adopted in 2026 — and which they quietly avoided.",
    content: `
<p>By 2026 almost every enterprise application offered an AI assist somewhere. Adoption separated sharply between products that made automated help understandable and products that asked users to trust a black box. Design, not model choice, was usually the deciding factor.</p>
<h2>Transparency patterns</h2>
<p>The patterns that worked were unglamorous: label what was generated, show the source it came from, and state confidence in plain language rather than a percentage nobody could interpret. Destructive or financial actions kept an explicit confirmation step. Users could always see the underlying data behind a summary, which turned scepticism into verification instead of abandonment.</p>
<h2>Design systems under AI pressure</h2>
<p>Generative tooling made producing screens cheap, which put pressure on consistency. Teams responded by tightening tokens, component contracts, and content guidelines so AI-drafted layouts snapped into an approved system. Designers reviewed generated variants the way engineers review pull requests — quickly, but never automatically. Figma-to-code handoffs improved, yet interaction states, empty states, and error states still needed deliberate human specification.</p>
<h2>Accessibility and research</h2>
<p>Streamed and dynamic content raised real accessibility questions: focus management, live-region announcements, and keyboard paths through assistive panels. WCAG conformance was tested against generated output, not only static templates. Usability research stayed essential — session recordings and interviews revealed where users silently ignored an assistant, a signal no analytics dashboard surfaced on its own.</p>
<p>PrequaliQ designs interfaces where AI assistance is legible, accessible, and grounded in research — so people use the feature instead of working around it.</p>
`,
  },
  {
    slug: "2026-system-integration-agent-ready-apis",
    serviceSlug: "system-integration",
    publishedAt: "2026-07-23T15:35:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1400&q=80",
    title: "System Integration: Agent-Ready APIs Across the Enterprise",
    excerpt:
      "MCP servers, idempotent write paths, and approval gates turned integration layers into safe ground for autonomous agents in 2026.",
    content: `
<p>Integration work in 2026 gained a demanding new consumer. Alongside web clients and batch jobs, <strong>AI agents</strong> began calling enterprise systems — and they called them at unpredictable times, in unpredictable orders, sometimes twice. Integration layers built only for well-behaved clients started to show cracks.</p>
<h2>What agent-ready actually means</h2>
<p>Practically, it meant three properties. Operations were <strong>idempotent</strong>, so a retried purchase order created one record rather than two. Contracts were self-describing, with OpenAPI schemas and error messages an agent could reason about instead of generic 500s. And every write path had a declared scope, so a connector granted read access to invoices could not silently issue payments.</p>
<h2>MCP as the enterprise seam</h2>
<p><strong>Model Context Protocol</strong> servers matured into the standard seam between agents and systems of record. Rather than exposing raw ERP endpoints, teams published curated tools — "look up shipment status", "draft a credit note" — each with input validation, rate limits, and audit logging. High-impact operations kept a <strong>human approval gate</strong>, queuing the proposed action for a named reviewer.</p>
<h2>Event backbones and observability</h2>
<p>Kafka, Azure Service Bus, and outbox patterns still carried the heavy asynchronous flows between ERP, CRM, and custom services, with dead-letter queues and replay tooling. What changed was monitoring: teams tracked which caller — human or agent — drove latency, error rates, and cost, because a misconfigured agent loop could generate more traffic in an hour than a year of normal use.</p>
<p>PrequaliQ builds integration layers that serve applications and agents alike — versioned, observable, and safe to expose without rip-and-replace.</p>
`,
  },
  {
    slug: "2026-legacy-modernization-ai-assisted-rewrites",
    serviceSlug: "legacy-modernization",
    publishedAt: "2026-08-11T09:20:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1400&q=80",
    title: "Legacy Modernization: AI-Assisted Rewrites Without Downtime",
    excerpt:
      "AI made reading old code cheap in 2026 — but characterisation tests, parallel running, and phased cutovers still decided whether modernisation succeeded.",
    content: `
<p>Modernisation programmes in 2026 gained a genuinely useful new capability: AI could read decades-old code and explain it. Summarising a COBOL batch job or an undocumented stored procedure went from weeks of archaeology to an afternoon of guided review. What did not change was the risk of switching a business-critical system over.</p>
<h2>Comprehension before conversion</h2>
<p>The highest-value use of AI was documentation, not translation. Assistants produced call graphs, data-flow notes, and candidate business rules extracted from legacy modules, which domain experts then confirmed or corrected. That artefact — a validated description of current behaviour — became the specification. Teams that skipped straight to machine-translated code inherited the original's bugs plus new ones nobody understood.</p>
<h2>Characterisation tests as the safety net</h2>
<p>Before any module moved, teams captured real inputs and outputs and generated <strong>characterisation tests</strong> that pinned existing behaviour, quirks included. AI accelerated writing those tests from production samples. The new implementation had to match the old one on recorded cases, and both ran in parallel against live traffic with output comparison until discrepancies fell to zero.</p>
<h2>Phased cutover, unchanged discipline</h2>
<p>The <strong>strangler fig</strong> pattern remained the default: API facades over legacy data, new functionality in modern services, and traffic shifted a slice at a time with a tested rollback. Observability went in before migration, not after. Operations teams trained on the new system while the old one still ran, and senior maintainers reviewed every extracted rule — their judgement remained the scarcest asset in the programme.</p>
<p>PrequaliQ modernises legacy estates in verifiable phases — using AI to understand the system faster, and engineering discipline to replace it safely.</p>
`,
  },
  {
    slug: "2026-maintenance-support-autonomous-operations",
    serviceSlug: "maintenance-support",
    publishedAt: "2026-08-26T13:05:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1400&q=80",
    title: "Maintenance & Support: How Far Autonomous Operations Go",
    excerpt:
      "Agentic triage, automated dependency upgrades, and AI-drafted postmortems cut toil in 2026 — while incident ownership stayed firmly human.",
    content: `
<p>Operations teams in 2026 automated more of the night shift than ever before, and learned precisely where to stop. Agents that read telemetry, correlate deploys, and propose a cause removed hours of repetitive triage. Agents allowed to act unsupervised on production created a new class of incident.</p>
<h2>Triage that earns its place</h2>
<p>Effective setups grounded agents in observability data — traces, logs, recent changes, and prior incidents — and had them produce a ranked hypothesis with the evidence attached. On-call engineers started from a briefed position instead of a blank dashboard at 03:00. Accuracy was measured: teams tracked how often the top hypothesis matched the eventual root cause, and tuned or removed automation that scored poorly.</p>
<h2>Bounded autonomy</h2>
<p>Automated remediation was permitted for well-understood, reversible actions — restarting a stuck worker, scaling a queue consumer, rotating a leaked token — each with a hard blast radius and an audit entry. Anything touching data, money, or customer records queued a proposal for human approval. <strong>SLAs</strong>, on-call rotations, and post-incident reviews stayed exactly where they were, with AI drafting timelines that engineers edited and signed.</p>
<h2>Continuous, unglamorous upkeep</h2>
<p>Dependency scanning, SBOM tracking, certificate rotation, and framework upgrades ran as scheduled work rather than crisis response. AI-generated upgrade pull requests made staying current cheaper, though each still needed tests and a review. Cost and capacity reviews sat alongside reliability metrics, since token spend and GPU capacity had become recurring operational line items.</p>
<p>PrequaliQ keeps business-critical applications secure and observable — automating the toil, and keeping accountability with named humans.</p>
`,
  },
];
