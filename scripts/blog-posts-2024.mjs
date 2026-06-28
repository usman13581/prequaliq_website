/** 2024 service blog posts — one per service, weekday publish times 09:00–17:00 Stockholm. */
export const blogPosts = [
  {
    slug: "2024-web-and-mobile-applications",
    serviceSlug: "web-and-mobile-apps",
    publishedAt: "2024-03-06T11:55:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80",
    title: "Web & Mobile Applications: React 19 and the Next.js App Router Era",
    excerpt:
      "How teams in 2024 shipped faster with React 19, Next.js 14 and 15, and tighter performance budgets across web and native clients.",
    content: `
<p>In 2024, web and mobile applications remained the front door to most digital products — but the bar for speed, accessibility, and maintainability rose sharply. Users expected instant interactions on any device, while engineering teams needed frameworks that could scale without constant rewrites.</p>
<h2>What teams were building</h2>
<p><strong>React 19</strong> brought improved server components, better concurrent rendering, and cleaner data-fetching patterns that reduced client-side bundle weight. <strong>Next.js 14 and 15</strong> matured the App Router, making streaming, partial prerendering, and edge deployment practical for production workloads. Mobile teams continued with <strong>React Native</strong> and <strong>Flutter</strong>, often sharing design tokens and API contracts with web squads rather than duplicating business logic.</p>
<h2>Architecture trends</h2>
<p>Composable frontends consumed typed APIs — often OpenAPI-generated clients — with authentication handled through standards-based identity providers. Performance budgets, Core Web Vitals, and WCAG 2.2 compliance were baseline release criteria, not stretch goals. Feature flags and staged rollouts kept high-traffic releases safe.</p>
<h2>What mattered in delivery</h2>
<p>Successful programmes measured outcomes: conversion, task completion time, and support volume — not feature counts. Observability from the browser (real user monitoring) paired with backend traces gave teams a full picture when something felt slow.</p>
<p>At PrequaliQ, we help organisations plan, design, and launch web and mobile products that fit how teams actually work — from first prototype to production scale.</p>
`,
  },
  {
    slug: "2024-custom-software-solutions",
    serviceSlug: "custom-software",
    publishedAt: "2024-04-23T10:10:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    title: "Custom Software: .NET 8 and Domain-Led Delivery",
    excerpt:
      "Why bespoke applications, vertical workflows, and .NET 8 still won when SaaS templates could not match how the business operated.",
    content: `
<p>SaaS covered plenty of ground in 2024, yet many organisations still needed software shaped around proprietary processes — approval chains, regulatory checks, and integrations that no single vendor could own end to end. Custom software remained the practical choice when operational nuance <em>is</em> the advantage.</p>
<h2>Technology choices</h2>
<p><strong>.NET 8</strong> offered long-term support, improved performance, and a clear path for Windows-centric estates modernising without rip-and-replace drama. Teams also chose <strong>TypeScript</strong> and <strong>Node.js</strong> for event-driven services and real-time features. Domain-driven design and bounded contexts kept monoliths from creeping back while still allowing incremental delivery.</p>
<h2>Integration as a requirement</h2>
<p>Custom applications rarely stood alone. ERP modules, CRM records, warehouse systems, and payment gateways all needed reliable exchange. Idempotent APIs, outbox patterns, and well-tested message handlers reduced silent failures when upstream systems changed without warning.</p>
<h2>Delivery discipline</h2>
<p>Two-week sprints, automated regression suites, and staged rollouts protected business continuity. Internal IT teams needed documentation and handover plans they could operate long after the initial build.</p>
<p>PrequaliQ designs custom software around your operating model — not the other way around — with architecture that can evolve as regulations and markets shift.</p>
`,
  },
  {
    slug: "2024-ui-ux-design-practices",
    serviceSlug: "ui-ux-design",
    publishedAt: "2024-05-16T15:25:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1586717791821-3fa891ee9427?auto=format&fit=crop&w=1400&q=80",
    title: "UI/UX Design: Design Systems That Survived AI-Assisted Drafting",
    excerpt:
      "Figma variables, accessible patterns, and research-led validation kept enterprise interfaces coherent as AI tooling accelerated early ideation.",
    content: `
<p>By 2024, users expected consumer-grade experiences inside business software — and AI-assisted drafting tools made it easier than ever to produce screens quickly. The challenge shifted from volume to coherence: interfaces that stayed usable, accessible, and on brand after dozens of iterations.</p>
<h2>Design systems and Figma</h2>
<p><strong>Figma</strong> variables and shared component libraries kept spacing, typography, and colour tokens aligned across web and mobile. Atomic patterns reduced rework between design and engineering, especially when <strong>React</strong> and <strong>Next.js</strong> teams consumed tokens directly in code. AI-generated mock-ups were useful for exploration, but human review remained essential for flow logic and edge cases.</p>
<h2>Research and validation</h2>
<p>Short usability cycles, clickable prototypes, and analytics from production informed decisions before features were committed. Jobs-to-be-done framing kept workshops focused on outcomes rather than personal taste or novelty for its own sake.</p>
<h2>Inclusive and compliant interfaces</h2>
<p>Contrast ratios, keyboard navigation, and screen-reader-friendly labels were non-negotiable in the EU market. GDPR-conscious consent flows and transparent notification settings remained part of every serious release checklist.</p>
<p>Good UX in 2024 was operational efficiency, not decoration. PrequaliQ pairs research-led design with implementation teams so interfaces stay usable long after launch.</p>
`,
  },
  {
    slug: "2024-cloud-solutions-platform-engineering",
    serviceSlug: "cloud-solutions",
    publishedAt: "2024-06-11T09:15:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80",
    title: "Cloud Solutions: Platform Engineering and Greener Estates",
    excerpt:
      "Kubernetes, internal developer platforms, FinOps, and green-cloud practices shaped how organisations ran workloads in 2024.",
    content: `
<p>Cloud adoption in 2024 was less about first migration and more about maturing how teams delivered — safely, repeatably, and with cost and carbon in view. Many European organisations ran hybrid estates where identity, networking, and platform standards mattered as much as raw compute.</p>
<h2>Platforms and patterns</h2>
<p><strong>Microsoft Azure</strong> and <strong>AWS</strong> remained dominant for enterprise workloads. <strong>Kubernetes</strong> — often via AKS or EKS — was the default deploy target for new services. <strong>Platform engineering</strong> teams built internal developer platforms: golden paths, self-service environments, and guardrails that let product squads ship without reinventing CI/CD every sprint.</p>
<h2>Green cloud and FinOps</h2>
<p>Leaders asked not only what workloads cost, but what they emitted. Right-sizing, autoscaling policies, and regional placement aligned with <strong>green cloud</strong> goals without sacrificing resilience. Tagging, reserved capacity, and chargeback models kept engineering accountable for spend.</p>
<h2>Observability by default</h2>
<p><strong>OpenTelemetry</strong> became the common language for traces, metrics, and logs — reducing vendor lock-in while improving mean time to recovery. Backup, disaster recovery, and EU data residency stayed on every architecture review agenda.</p>
<p>PrequaliQ helps organisations plan cloud roadmaps, execute migrations, and build cloud-native applications with cost, compliance, and sustainability in view from day one.</p>
`,
  },
  {
    slug: "2024-system-integration-apis",
    serviceSlug: "system-integration",
    publishedAt: "2024-07-24T14:40:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    title: "System Integration: Event-Driven APIs in a Multi-Vendor World",
    excerpt:
      "REST, async events, iPaaS, and contract testing kept ERP, CRM, and SaaS estates aligned when change was constant.",
    content: `
<p>Most organisations in 2024 did not lack software — they lacked connected software. Integration programmes turned isolated systems into a coherent operational picture: orders, inventory, finance, and customer records updating without manual re-entry or fragile overnight batch jobs.</p>
<h2>Integration styles</h2>
<p><strong>REST APIs</strong> remained the workhorse for synchronous calls, often documented with OpenAPI and validated through contract tests in CI. <strong>GraphQL</strong> suited flexible client queries where over-fetching was costly. For high-volume or decoupled flows, message brokers — Azure Service Bus, RabbitMQ, or Kafka — carried events with retry, idempotency keys, and dead-letter handling.</p>
<h2>iPaaS and custom middleware</h2>
<p>Platforms like Boomi, MuleSoft, or Azure Logic Apps accelerated standard connectors, while custom middleware handled domain rules no template could capture. Mature programmes mixed both: commodity integrations on iPaaS, critical paths engineered in code with full test coverage and observability via <strong>OpenTelemetry</strong>.</p>
<h2>Quality and governance</h2>
<p>Versioned contracts, sandbox environments, and monitored latency and error rates reduced breakage when vendors upgraded without notice. Integration health was as visible as application uptime on executive dashboards.</p>
<p>PrequaliQ builds integration layers that respect your existing investments — Oracle, Salesforce, .NET services, and modern SaaS — without forcing a rip-and-replace strategy.</p>
`,
  },
  {
    slug: "2024-legacy-modernization-paths",
    serviceSlug: "legacy-modernization",
    publishedAt: "2024-08-14T11:30:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538ac97?auto=format&fit=crop&w=1400&q=80",
    title: "Legacy Modernization: Incremental Paths with .NET 8 and Containers",
    excerpt:
      "Strangler-fig programmes, API facades, and container targets helped teams replace ageing systems without stopping the business.",
    content: `
<p>Legacy modernisation dominated IT backlogs in 2024. Monoliths and ageing platforms still ran critical processes, but maintenance costs, security exposure, and shrinking skill pools pushed leaders to act — carefully, and in phases.</p>
<h2>The strangler fig pattern</h2>
<p>Big-bang rewrites lost favour. Programmes routed new functionality through modern services while legacy cores handled stable workloads. API facades wrapped old databases, giving frontends a clean contract while data migration continued in the background without blocking daily operations.</p>
<h2>Technical targets</h2>
<p>Containers and <strong>Kubernetes</strong> provided a consistent deploy target for refactored modules. <strong>.NET 8</strong> migration paths helped Windows-centric estates move forward with long-term support. Selected modules moved to managed cloud services to reduce patching burden and improve observability.</p>
<h2>People and process</h2>
<p>Modernisation failed when treated as pure technology. Training, parallel running, and clear rollback plans kept operations teams confident. Knowledge capture from senior maintainers was as valuable as the new codebase itself.</p>
<p>PrequaliQ modernises legacy systems in phases — improving security and agility while protecting daily operations.</p>
`,
  },
  {
    slug: "2024-ai-solutions-agents-rag",
    serviceSlug: "ai-solutions",
    publishedAt: "2024-09-10T16:00:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    title: "AI Solutions: Agents, RAG at Scale, and the EU AI Act",
    excerpt:
      "Production AI in 2024 meant retrieval-augmented generation, vector stores, and governance as the EU AI Act neared finalisation.",
    content: `
<p>Enterprise AI in 2024 moved decisively beyond chat demos. Organisations deployed <strong>AI agents</strong> and assistants embedded in workflows — support routing, document Q&amp;A, code review assistance, and operational copilots — with clear guardrails and measurable ROI.</p>
<h2>RAG at scale</h2>
<p><strong>Retrieval-augmented generation (RAG)</strong> became the default pattern for grounding models in private knowledge. Teams paired embedding pipelines with vector databases such as <strong>Pinecone</strong> or <strong>pgvector</strong> inside PostgreSQL, balancing latency, cost, and data residency. Chunking strategies, citation of sources, and evaluation suites separated pilots from production.</p>
<h2>Developer productivity</h2>
<p><strong>GitHub Copilot Enterprise</strong> and similar tools accelerated routine coding, but organisations still needed architecture review, testing, and security scanning — AI amplified teams; it did not replace delivery discipline.</p>
<h2>Governance and the EU AI Act</h2>
<p>As the <strong>EU AI Act</strong> neared finalisation, risk classification, human oversight, documentation, and audit trails moved from legal slides into engineering backlogs. Purpose limitation and data minimisation remained central for GDPR-aligned programmes.</p>
<p>PrequaliQ focuses on AI that attaches to real business processes — with clear metrics, maintainable pipelines, and governance appropriate to your industry.</p>
`,
  },
  {
    slug: "2024-data-analytics-insights",
    serviceSlug: "data-analytics",
    publishedAt: "2024-10-22T10:45:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    title: "Data & Analytics: Trusted Metrics in the AI-Assisted Era",
    excerpt:
      "Lakehouses, semantic layers, and governed self-service helped leaders trust dashboards when AI-generated summaries proliferated.",
    content: `
<p>Data and analytics in 2024 had to do two jobs at once: give leaders trusted operational metrics, and feed structured, governed datasets into AI and RAG pipelines without duplicating definitions or leaking sensitive fields.</p>
<h2>Modern data stacks</h2>
<p>Cloud warehouses and lakehouse patterns (<strong>Snowflake</strong>, <strong>BigQuery</strong>, <strong>Synapse</strong>) simplified large-scale storage. <strong>dbt</strong> kept transformations tested and version-controlled. <strong>Power BI</strong> semantic models and certified datasets gave business teams self-service with guardrails rather than endless spreadsheet exports.</p>
<h2>Data quality and governance</h2>
<p>Garbage-in still meant garbage-out — especially when vector embeddings amplified bad source data. Column-level lineage, role-based access, and clear ownership of KPI definitions reduced conflicting numbers across departments. GDPR and internal policy required knowing who could see personal or financial data, and why.</p>
<h2>Analytics meets AI</h2>
<p>Curated embeddings and metadata made RAG answers more reliable. Observability for data pipelines — freshness alerts, anomaly detection — prevented silent drift from undermining decisions.</p>
<p>PrequaliQ helps organisations connect source systems, model data responsibly, and build reporting that teams actually use — not shelf-ware.</p>
`,
  },
  {
    slug: "2024-dedicated-teams-model",
    serviceSlug: "dedicated-teams",
    publishedAt: "2024-01-31T09:40:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    title: "Dedicated Teams: Squads Built for Platform and Product Velocity",
    excerpt:
      "Embedded remote-ready teams with Next.js, .NET 8, and platform skills helped organisations scale delivery without losing domain context.",
    content: `
<p>Hiring every specialist locally remained difficult in 2024. Dedicated development teams — embedded with product owners, working in the client's tools and ceremonies — gave organisations velocity without permanent headcount for multi-quarter roadmaps.</p>
<h2>How the model worked</h2>
<p>A stable squad typically included backend and frontend engineers, QA, and often UX or platform skills. Teams joined existing backlogs, participated in sprint planning and retrospectives, and stayed long enough to understand domain nuance — not just ticket text. Squads comfortable with <strong>Next.js</strong>, <strong>.NET 8</strong>, and cloud-native delivery could slot into modernisation or greenfield work without a long ramp-up.</p>
<h2>Remote collaboration norms</h2>
<p>Slack, Teams, Jira, Azure DevOps, and GitHub remained the daily workspace. Clear written specs, recorded demos, and overlapping core hours across time zones kept distributed work productive. Security policies — VPN, MFA, device management — applied to external squads the same as internal staff.</p>
<h2>When it made sense</h2>
<p>Platform rebuilds, ERP extensions, and AI-assisted product programmes spanning several quarters were strong fits. Short one-off tasks were better handled as fixed-scope projects.</p>
<p>PrequaliQ provides dedicated teams that behave like an extension of your organisation — transparent communication, shared accountability, and delivery you can plan around.</p>
`,
  },
  {
    slug: "2024-it-consulting-roadmaps",
    serviceSlug: "it-consulting",
    publishedAt: "2024-11-13T13:20:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
    title: "IT Consulting: Roadmaps for AI, Cloud, and Regulated Change",
    excerpt:
      "Enterprise architecture, EU AI Act readiness, and platform strategy helped sponsors prioritise investment with confidence.",
    content: `
<p>IT consulting in 2024 sat at the intersection of ambition and accountability. Boards wanted AI and cloud progress, but regulators, security teams, and tight budgets demanded sharper prioritisation. Consultants who linked technology choices to measurable business cases earned lasting trust.</p>
<h2>Architecture and assessment</h2>
<p>Current-state reviews mapped applications, integrations, and technical debt. Target architectures balanced cloud adoption, Zero Trust baselines, and maintainability. Programmes increasingly included AI readiness: data quality for RAG, vector-store options, and risk tiers under the emerging <strong>EU AI Act</strong> framework.</p>
<h2>Vendor and platform decisions</h2>
<p>Oracle Cloud, Microsoft stacks, Salesforce, and bespoke .NET estates all required honest fit-gap analysis. Proof-of-concept phases de-risked large commitments before multi-year contracts were signed. Platform engineering investments were evaluated alongside application projects.</p>
<h2>Programme governance</h2>
<p>Steering groups, KPI tracking, and change management kept programmes aligned when priorities shifted mid-year. Consultants who could speak to finance and operations — not only engineering — helped sponsors defend investment through budget cycles.</p>
<p>PrequaliQ consulting engagements focus on actionable roadmaps: what to do first, what to defer, and how to measure success.</p>
`,
  },
  {
    slug: "2024-maintenance-support-operations",
    serviceSlug: "maintenance-support",
    publishedAt: "2024-12-04T10:05:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    title: "Maintenance & Support: OpenTelemetry and Always-On Reliability",
    excerpt:
      "SLAs, dependency hygiene, OpenTelemetry observability, and continuous improvement for business-critical applications.",
    content: `
<p>Launch day is visible; maintenance is where reliability is won or lost. In 2024, organisations depended on applications accelerated during earlier transformation years — now those systems needed sustainable care: patches, monitoring, performance tuning, and small enhancements aligned with platform and security standards.</p>
<h2>Operational practices</h2>
<p>Defined <strong>SLAs</strong> for response and resolution times set expectations. On-call rotations, incident runbooks, and blameless post-incident reviews reduced repeat outages. <strong>OpenTelemetry</strong> unified traces, metrics, and logs across services — shortening diagnosis when latency spiked or integrations failed silently.</p>
<h2>Security maintenance</h2>
<p>Dependency scanning, OS patching, and certificate rotation were continuous tasks. Supply-chain vulnerabilities reminded everyone that idle systems were not safe systems. SBOM reviews and signed artefacts became routine in vendor and internal release processes.</p>
<h2>Evolutionary improvement</h2>
<p>Good support was not frozen software. Small UX fixes, report tweaks, and integration adjustments kept systems aligned with business change without starting new mega-projects. Observability data informed where tuning delivered the highest return.</p>
<p>PrequaliQ maintenance and support services keep your applications secure, observable, and ready for the next feature — not just the last outage.</p>
`,
  },
];
