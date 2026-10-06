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
  {
    slug: "2026-ai-solutions-eu-ai-act-in-practice",
    serviceSlug: "ai-solutions",
    publishedAt: "2026-09-17T14:55:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80",
    title: "AI Solutions: The EU AI Act as Routine Engineering Work",
    excerpt:
      "Compliance stopped being a legal memo in 2026 and became artefacts engineers produce — risk classifications, traceable logs, oversight records, and monitoring plans.",
    content: `
<p>For two years the <strong>EU AI Act</strong> lived in slide decks. In 2026 it landed in sprint backlogs. The organisations that handled it calmly had stopped treating compliance as a document produced at the end and started treating it as artefacts generated by the system itself.</p>
<h2>Classification decides the workload</h2>
<p>Everything follows from honest risk classification. Most internal tooling — summarising tickets, drafting copy, ranking leads — sat in the limited-risk tier and needed little more than disclosure that users were interacting with AI. The obligations concentrated on <strong>high-risk</strong> uses: decisions affecting employment, creditworthiness, or access to services. Teams that classified early avoided retrofitting documentation onto systems already in production.</p>
<h2>Artefacts, not assurances</h2>
<p>Four things had to exist and stay current: technical documentation describing intended purpose and known limitations; <strong>traceable logs</strong> recording inputs, model version, and outputs for the retention period; evidence of <strong>human oversight</strong>, meaning a named reviewer who can actually override a decision rather than a checkbox; and a post-market monitoring plan with thresholds that trigger review. Generating these from pipelines and audit tables beat maintaining them by hand, because hand-maintained documents drift the moment a prompt changes.</p>
<h2>Where engineering meets obligation</h2>
<p>Versioned prompts, pinned model releases, and immutable output logs turned "which system produced this answer in March?" into a query rather than an investigation. Serious-incident procedures reused existing on-call runbooks. Deployers of high-risk systems in public services also prepared fundamental rights impact assessments — far easier when the data flows were already mapped.</p>
<p>PrequaliQ builds AI systems where compliance evidence is a by-product of good engineering, not a parallel paperwork exercise.</p>
`,
  },
  {
    slug: "2026-custom-software-platform-boundaries",
    serviceSlug: "custom-software",
    publishedAt: "2026-10-06T09:15:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    title: "Custom Software: Drawing Platform Boundaries That Hold",
    excerpt:
      "October 2026 programmes spent less time debating frameworks and more time deciding what belongs in the platform versus what stays in product teams — and writing those contracts down.",
    content: `
<p>Custom software delivery in late 2026 looked less like endless greenfield builds and more like <strong>platform craft</strong>: shared capabilities, clear ownership, and product teams that could ship without negotiating every dependency. The programmes that stayed calm had stopped arguing about frameworks and started arguing about <strong>boundaries</strong>.</p>
<h2>What belongs in the platform</h2>
<p>Identity, audit logging, document generation, messaging, and billing adapters earned their place when at least two products needed the same behaviour with the same compliance bar. Everything else stayed close to the product. Teams published capability catalogues with SLAs, versioning rules, and deprecation windows — so product squads could plan against a contract rather than a Slack thread.</p>
<h2>Contracts beat conventions</h2>
<p>OpenAPI and event schemas became the negotiation surface. Breaking changes required a migration plan and a dual-run period, not a Friday deploy. AI assistants accelerated boilerplate inside each bounded context, but architects still owned the seams: which data may cross a boundary, which calls are synchronous, and which failures must be compensating rather than retried forever.</p>
<h2>Delivery that survives reorganisation</h2>
<p>Platform teams measured adoption and time-to-first-success for new consumers, not lines of shared code. Product teams measured outcomes. When ownership shifted, the contracts and ADRs travelled with the code — so knowledge did not live only in the heads of the people who built the first version.</p>
<p>PrequaliQ designs and builds custom platforms with boundaries you can defend — so speed compounds instead of creating a second monolith.</p>
`,
  },
  {
    slug: "2026-system-integration-event-contracts",
    serviceSlug: "system-integration",
    publishedAt: "2026-10-13T13:33:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    title: "System Integration: Event Contracts That Survive Change",
    excerpt:
      "Integrations that aged well in 2026 treated events as versioned products — with schemas, consumers, and failure modes agreed before the first message left the broker.",
    content: `
<p>Point-to-point APIs still carried plenty of traffic in 2026, but the integrations that survived reorganisations were the ones built on <strong>event contracts</strong>. When every system expected a private webhook shape, a single field rename became a multi-week programme. When producers published versioned events, consumers could migrate on their own clocks.</p>
<h2>Schema first, wiring second</h2>
<p>Teams registered events in a catalogue with owners, compatibility rules, and sample payloads. Producers could not ship a breaking change without a new major version and a dual-publish window. Consumers declared interest by topic and version, and monitoring showed lag and poison-message rates per subscription — not a single opaque queue depth.</p>
<h2>Failure is part of the design</h2>
<p>Idempotent handlers, dead-letter queues with replay playbooks, and explicit “at-least-once” assumptions removed the pretend world where every message arrives once and forever. Timeouts and compensating actions were written into the integration design review, beside the happy path.</p>
<h2>Agents at the edges, not in the middle</h2>
<p>AI helped draft adapters and map legacy fields, but the broker and the contracts stayed deterministic. An agent suggesting a field mapping still produced a reviewed pull request. Regulated data never left approved gateways for “helpful” transformation in a public model.</p>
<p>PrequaliQ connects enterprise systems with contracts and failure modes you can operate — not glue that only the original author understands.</p>
`,
  },
  {
    slug: "2026-it-consulting-portfolio-rationalisation",
    serviceSlug: "it-consulting",
    publishedAt: "2026-10-14T14:21:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    title: "IT Consulting: Q4 Portfolio Rationalisation Without Theatre",
    excerpt:
      "Autumn planning in 2026 rewarded leaders who cut overlap, funded platforms, and sequenced modernisation — instead of inflating roadmaps with every stakeholder wish.",
    content: `
<p>Q4 planning season in 2026 produced the usual pressure to say yes to every initiative. The organisations that exited winter stronger used consulting engagements to <strong>rationalise the portfolio</strong>: fewer parallel programmes, clearer owners, and investment tied to measurable outcomes rather than slide count.</p>
<h2>Map before you mandate</h2>
<p>A useful starting point was an honest application and capability map — what runs, who pays for it, which risks it carries, and where three tools perform the same job. Overlap became visible. So did shadow IT that had quietly become business-critical. Decisions followed evidence, not the loudest steering committee.</p>
<h2>Sequence beats simultaneity</h2>
<p>Modernisation, AI pilots, and vendor consolidations competed for the same scarce architects and change budget. Advisors who earned trust proposed a sequence: stabilise the platforms that everything depends on, retire or merge duplicates, then fund differentiation. Parallel “transformation” tracks without capacity planning simply created thrash.</p>
<h2>Governance that enables</h2>
<p>Lightweight architecture reviews, funding gates tied to exit criteria, and shared definitions of done kept programmes honest without recreating a PMO paper mill. AI assisted discovery and documentation drafts; humans still owned prioritisation and accountability.</p>
<p>PrequaliQ advises leadership teams on portfolios that fit real capacity — so strategy survives contact with the calendar.</p>
`,
  },
  {
    slug: "2026-ai-solutions-evaluation-harnesses",
    serviceSlug: "ai-solutions",
    publishedAt: "2026-10-15T14:01:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    title: "AI Solutions: Evaluation Harnesses as a Product Feature",
    excerpt:
      "Teams that shipped trustworthy AI in 2026 treated eval suites like regression tests — versioned, owned, and blocking releases when scores slipped.",
    content: `
<p>By October 2026, “we tried the model and it looked good” was no longer a release argument. Serious AI features shipped with an <strong>evaluation harness</strong>: fixed scenarios, scoring rubrics, and thresholds that gated promotion the same way automated tests gate a service release.</p>
<h2>What an eval suite actually contains</h2>
<p>Golden questions drawn from real tickets and documents; adversarial prompts that probe injection and overreach; latency and cost budgets; and human-graded samples for tasks where automatic metrics lie. Suites lived in the repo next to prompts and retrieval configs, so a prompt tweak without an eval change was an incomplete change.</p>
<h2>Blocking the wrong kind of progress</h2>
<p>When a new model improved creativity but tanked citation accuracy, the harness failed the build. Product owners saw graphs, not anecdotes. Rollbacks were minutes: pin the previous prompt and model pair, re-run the suite, redeploy.</p>
<h2>EU AI Act reality check</h2>
<p>For higher-risk uses, eval evidence fed technical documentation and post-market monitoring. Traceable runs recorded which suite version approved which release. That turned compliance conversations into engineering artefacts instead of after-the-fact essays.</p>
<p>PrequaliQ builds AI features where quality is measured continuously — so improvement never depends on a demo that cannot be repeated.</p>
`,
  },
  {
    slug: "2026-legacy-modernization-exit-ramps",
    serviceSlug: "legacy-modernization",
    publishedAt: "2026-10-19T12:57:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    title: "Legacy Modernisation: Exit Ramps, Not Big-Bang Cuts",
    excerpt:
      "Successful 2026 modernisations designed how traffic leaves the old system — strangler routes, dual writes, and kill switches — before rewriting the first domain.",
    content: `
<p>Legacy modernisation still failed in 2026 when teams started with a rewrite and hoped cutover would invent itself. It succeeded when the first design artefact was the <strong>exit ramp</strong>: how traffic, data, and operations move off the old system in reversible steps.</p>
<h2>Strangle with intent</h2>
<p>Edge proxies and feature flags routed slices of users to new services while the monolith kept the long tail. Each slice had acceptance metrics — error rate, latency, business reconciliation — before the next slice opened. AI accelerated reverse-engineering of obscure modules; humans still chose slice order based on risk and value.</p>
<h2>Data is the hard part</h2>
<p>Dual writes, change-data-capture, and reconciliation jobs ran longer than anyone wanted, and that was correct. “We’ll migrate the database in a weekend” remained a fantasy for estates with decades of batch jobs. Programmes that scheduled reconciliation as first-class work avoided silent divergence.</p>
<h2>Kill switches and rollback theatre</h2>
<p>Every ramp had a documented way back. Practising rollback in lower environments turned cutover night from heroics into a checklist. Knowledge transfer and runbooks shipped with each slice so support did not discover the new path only in an incident.</p>
<p>PrequaliQ modernises legacies with exit ramps you can reverse — so progress never depends on a single irreversible leap.</p>
`,
  },
  {
    slug: "2026-ui-ux-design-accessible-ai-surfaces",
    serviceSlug: "ui-ux-design",
    publishedAt: "2026-10-20T10:05:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80",
    title: "UI/UX Design: Accessible AI Surfaces Users Can Trust",
    excerpt:
      "Generative UI patterns matured in 2026 only where accessibility, editability, and honest uncertainty were designed in — not bolted on after launch.",
    content: `
<p>AI-assisted interfaces in 2026 looked polished in demos and fragile in production unless design treated <strong>accessibility and trust</strong> as primary requirements. Streaming answers, suggested forms, and generative layouts had to work with keyboards, screen readers, and sceptical users who needed to correct the machine.</p>
<h2>Editable by default</h2>
<p>Every generated field offered an obvious way to rewrite, reject, or regenerate with constraints. Designs that trapped users in a chat loop for tasks that were simpler as forms failed adoption metrics. Progressive disclosure kept advanced AI options available without overwhelming first-time users.</p>
<h2>Announce uncertainty</h2>
<p>Confidence cues, source citations, and “AI-assisted” labelling were part of the visual system, not legal footnotes. Screen-reader announcements covered streamed content without flooding the user. Colour alone never signalled status.</p>
<h2>Performance is a UX requirement</h2>
<p>Skeleton states, partial results, and offline-friendly behaviour kept AI features from punishing Core Web Vitals. Design and engineering shared a budget: if an assistive panel broke LCP, it did not ship — no matter how impressive the model felt in isolation.</p>
<p>PrequaliQ designs product interfaces where AI assistance is usable, accessible, and honest about its limits.</p>
`,
  },
  {
    slug: "2026-data-analytics-decision-layers",
    serviceSlug: "data-analytics",
    publishedAt: "2026-10-21T12:12:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    title: "Data Analytics: Decision Layers Above the Warehouse",
    excerpt:
      "Warehouses stayed foundational in 2026, but competitive advantage moved to certified semantic layers and decision workflows that embedded analytics where work happens.",
    content: `
<p>Building another dashboard stopped being a strategy in 2026. Advantage moved to the <strong>decision layer</strong>: certified metrics, governed access, and analytics embedded in the tools where managers already work — ERP screens, CRM side panels, and operational queues.</p>
<h2>Semantics before charts</h2>
<p>Teams that argued less about “whose revenue number is right” had published a semantic layer with owners, definitions, and tests. BI tools and AI assistants both queried that layer. When a definition changed, consumers updated together instead of forking spreadsheet logic.</p>
<h2>From insight to action</h2>
<p>Alerts and recommendations carried the metric, the threshold, and the next step — open a case, adjust a forecast, escalate a supplier. Analytics that only produced slides lost budget to workflows that closed loops. Human approval stayed required wherever money or people were affected.</p>
<h2>Cost and trust</h2>
<p>Query budgets, caching, and materialised aggregates kept AI exploration from melting warehouse spend. Lineage and access logs answered who saw what — essential when privacy teams and auditors asked sharp questions.</p>
<p>PrequaliQ builds analytics that leaders can act on — certified definitions, embedded decisions, and governance that keeps trust intact.</p>
`,
  },
  {
    slug: "2026-dedicated-teams-hybrid-governance",
    serviceSlug: "dedicated-teams",
    publishedAt: "2026-10-22T11:39:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
    title: "Dedicated Teams: Hybrid Governance That Keeps Ownership Clear",
    excerpt:
      "Nearshore squads thrived in 2026 when clients and partners shared one backlog, one Definition of Done, and one named owner for outcomes — not two parallel steering worlds.",
    content: `
<p>Dedicated teams in 2026 were rarely “staff augmentation with a nicer name.” The ones that delivered owned a product area end to end. The ones that stalled had two backlogs, two tools, and nobody who could say no. <strong>Hybrid governance</strong> — client product leadership plus partner delivery leadership — only worked when the rules were explicit.</p>
<h2>One backlog, one DoD</h2>
<p>Priorities lived in a single ordered backlog. The Definition of Done covered tests, security checks, accessibility, and operational readiness — including AI-assisted changes. Pull requests named human reviewers. Velocity was discussed as forecast, not as a weapon.</p>
<h2>Overlap hours and decision rights</h2>
<p>Stockholm-aligned overlap windows handled decisions that unblock the day. Architecture and security veto rights were written down so they did not appear as surprise blockers mid-sprint. Continuity plans covered parental leave and role changes without freezing delivery.</p>
<h2>AI as shared leverage</h2>
<p>Approved AI gateways, prompt libraries, and coding standards were shared assets of the squad, versioned like any other tool. Output rose; review culture stayed strict. Clients judged teams on outcomes and reliability, not on how many assistants appeared in a demo.</p>
<p>PrequaliQ assembles dedicated teams with governance that keeps ownership clear — so hybrid delivery still feels like one team.</p>
`,
  },
  {
    slug: "2026-web-and-mobile-offline-first-sync",
    serviceSlug: "web-and-mobile-apps",
    publishedAt: "2026-10-26T13:26:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
    title: "Web & Mobile: Offline-First Sync Users Can Rely On",
    excerpt:
      "Field and travel-heavy products in 2026 won when offline drafts, conflict rules, and sync status were first-class UX — not error toasts after a tunnel.",
    content: `
<p>Connectivity remained uneven for field workers, travellers, and industrial sites in 2026. Products that pretended every request would succeed frustrated users. Products that treated <strong>offline-first sync</strong> as a core feature — local drafts, clear status, and predictable conflict rules — earned trust.</p>
<h2>Local truth, remote reconciliation</h2>
<p>Mobile and progressive web apps wrote optimistically to a local store, queued mutations, and reconciled when the network returned. Conflict policies were product decisions: last-write-wins for notes, merge for inventories, human choice for financial edits. Designers surfaced sync state without technical jargon.</p>
<h2>Server components and edges</h2>
<p>Next.js and React Native stacks kept secrets and heavy AI on the server while the client stayed lean. Background sync respected OS battery and data limits. Streaming AI features degraded gracefully offline — cached summaries and queued prompts instead of blank screens.</p>
<h2>Security does not pause offline</h2>
<p>Encrypted local stores, remote wipe, and short-lived tokens limited blast radius if a device was lost. Audit logs recorded when queued actions finally committed, so compliance teams could still reconstruct who changed what.</p>
<p>PrequaliQ builds web and mobile apps that keep working when the network does not — with sync behaviour users understand.</p>
`,
  },
  {
    slug: "2026-cloud-solutions-nordic-resilience",
    serviceSlug: "cloud-solutions",
    publishedAt: "2026-10-28T13:08:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80",
    title: "Cloud Solutions: Nordic Resilience Without Runaway Cost",
    excerpt:
      "Multi-AZ and selective multi-region designs in 2026 paired with FinOps guardrails — so resilience targets were funded deliberately, not assumed.",
    content: `
<p>Nordic enterprises in 2026 still needed low latency for Stockholm users and sober answers for regulators about where data lived. Cloud programmes that worked paired <strong>resilience design</strong> with FinOps: every nine of availability had a price tag and an owner.</p>
<h2>Right-size the blast radius</h2>
<p>Multi-AZ was the default for stateful services that mattered. Full multi-region active-active was reserved for workloads with a clear RPO/RTO business case. Everything else used warm standbys or restore drills. Architecture reviews asked “what fails, who notices, how fast we recover” before “which region logos look good on a slide.”</p>
<h2>Platform and policy</h2>
<p>Landing zones enforced encryption, private networking, and tagging so cost and ownership were queryable. AI workloads routed through approved endpoints with quotas. GPU capacity was reserved for baselines and burst elsewhere — speculation without budgets became a board problem, not an engineering surprise.</p>
<h2>Prove recovery</h2>
<p>Game days and restore tests ran on a calendar. Runbooks lived with the services. When an AZ vanished in a drill, teams measured time to detect and time to recover — then fixed the gaps before a real incident charged tuition.</p>
<p>PrequaliQ designs cloud platforms that meet Nordic latency and compliance needs without treating unlimited spend as a resilience strategy.</p>
`,
  },
  {
    slug: "2026-maintenance-support-runbooks-as-code",
    serviceSlug: "maintenance-support",
    publishedAt: "2026-10-30T10:03:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    title: "Maintenance & Support: Runbooks as Code, Not Folklore",
    excerpt:
      "Operations matured in 2026 when incident steps lived in versioned runbooks next to the service — tested in drills, not reconstructed from chat history.",
    content: `
<p>Tribal knowledge still caused outages in 2026: the engineer who “knew the restart order” was on leave, and the wiki page was two years stale. Teams that professionalised support treated <strong>runbooks as code</strong> — versioned, reviewed, and exercised in game days.</p>
<h2>Store them where the service lives</h2>
<p>Markdown or executable checklists sat in the service repository, linked from alerts. Changes to architecture required runbook updates in the same pull request. AI drafted first versions from telemetry and past incidents; on-call engineers edited and signed them.</p>
<h2>Bounded automation</h2>
<p>Safe, reversible steps could run automatically with audit trails. Anything destructive stayed a human-gated proposal. Dependency upgrades, certificate rotation, and backup verification remained scheduled maintenance, not hope.</p>
<h2>Measure the boring excellence</h2>
<p>MTTD, MTTR, runbook freshness, and failed drill counts sat beside feature velocity. Leadership saw operations as a product capability. When AI suggested a cause during an incident, the runbook still decided what happened next.</p>
<p>PrequaliQ keeps critical systems operable — with runbooks you can trust at 03:00, not folklore you hope someone remembers.</p>
`,
  },
];
