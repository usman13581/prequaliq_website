/** 2022 service blog posts — one per service, weekday publish times 09:00–17:00 Stockholm. */
export const blogPosts2022 = [
  {
    slug: "2022-web-and-mobile-applications",
    serviceSlug: "web-and-mobile-apps",
    publishedAt: "2022-03-23T11:15:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80",
    title: "Web & Mobile Applications: Building for a Hybrid World",
    excerpt:
      "How organisations in 2022 approached React, Flutter, and progressive web apps after two years of accelerated digital demand.",
    content: `
<p>In 2022, web and mobile applications stopped being a nice-to-have and became the primary interface between businesses and their customers. After the rapid shift to remote and hybrid work, organisations needed reliable digital channels that worked on any device — without rebuilding everything from scratch every year.</p>
<h2>What teams were building</h2>
<p>Cross-platform frameworks such as <strong>Flutter 3</strong> and mature <strong>React Native</strong> releases made it easier to ship one codebase to iOS and Android. On the web, <strong>React 18</strong> and frameworks like <strong>Next.js 12</strong> improved performance with streaming and better server rendering. Progressive web apps (PWAs) remained popular for field teams that needed offline access without app-store friction.</p>
<h2>Architecture trends</h2>
<p>API-first design was the default. Frontends consumed REST or GraphQL services, often deployed separately from legacy back-office systems. Security expectations rose: OAuth 2.0, OpenID Connect, and short-lived tokens were standard for customer portals and employee apps alike.</p>
<h2>What mattered in delivery</h2>
<p>Successful projects in 2022 focused on measurable outcomes — faster onboarding, fewer support calls, clearer workflows — rather than feature lists. Accessibility (WCAG 2.1), performance budgets, and GDPR-conscious analytics were part of every serious release checklist.</p>
<p>At PrequaliQ, we help organisations plan, design, and launch web and mobile products that fit how teams actually work — from first prototype to production scale.</p>
`,
  },
  {
    slug: "2022-custom-software-solutions",
    serviceSlug: "custom-software",
    publishedAt: "2022-04-14T09:45:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    title: "Custom Software: When Off-the-Shelf Stopped Fitting",
    excerpt:
      "Why bespoke applications, domain-driven design, and .NET 6 mattered for organisations with unique processes.",
    content: `
<p>Standard SaaS products covered a lot of ground in 2022, but many mid-sized and enterprise organisations still hit limits: industry-specific workflows, complex approval chains, and integrations that no single vendor could fully own. Custom software remained the practical answer when the process <em>is</em> the competitive advantage.</p>
<h2>Technology choices</h2>
<p><strong>.NET 6</strong>, released in late 2021, was widely adopted through 2022 for stable, long-lived business systems. Teams also chose <strong>Node.js</strong> and <strong>TypeScript</strong> for greenfield services, especially when real-time features or JSON-heavy APIs were central. Domain-driven design (DDD) and clear bounded contexts helped teams avoid monolithic traps while still shipping incrementally.</p>
<h2>Integration as a requirement</h2>
<p>Custom applications rarely stood alone. ERP modules, CRM records, warehouse systems, and payment gateways all needed reliable data exchange. Event-driven patterns — message queues, webhooks, and idempotent APIs — reduced the risk of silent failures when upstream systems changed.</p>
<h2>Delivery discipline</h2>
<p>Agile delivery with two-week sprints, automated testing, and staged rollouts kept business continuity intact. Documentation and handover plans were essential; internal IT teams needed to operate what we built.</p>
<p>PrequaliQ designs custom software around your operating model — not the other way around — with architecture that can evolve as regulations and markets shift.</p>
`,
  },
  {
    slug: "2022-ui-ux-design-practices",
    serviceSlug: "ui-ux-design",
    publishedAt: "2022-05-18T14:30:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1586717791821-3fa891ee9427?auto=format&fit=crop&w=1400&q=80",
    title: "UI/UX Design: Clarity Over Complexity",
    excerpt:
      "Design systems, Figma collaboration, and inclusive interfaces shaped how enterprise products looked and felt in 2022.",
    content: `
<p>By 2022, users expected consumer-grade experiences inside business software. Cluttered admin panels and inconsistent forms were no longer tolerated — especially after teams spent years living inside collaboration tools with polished interfaces.</p>
<h2>Design systems and Figma</h2>
<p><strong>Figma</strong> had become the default collaboration surface for product designers and developers. Shared component libraries, design tokens, and documented spacing and typography scales reduced rework between design and engineering. Atomic design principles helped teams reuse patterns across web and mobile without losing brand coherence.</p>
<h2>Research and validation</h2>
<p>Remote usability testing matured. Short interview cycles, clickable prototypes, and analytics from tools like Hotjar or GA4 informed decisions before code was committed. Jobs-to-be-done framing kept workshops focused on outcomes rather than personal preferences.</p>
<h2>Inclusive and compliant interfaces</h2>
<p>Contrast ratios, keyboard navigation, and screen-reader-friendly labels were baseline requirements in the EU market. GDPR also influenced UX: clear consent flows, minimal data collection, and transparent settings for cookies and notifications.</p>
<p>Good UX in 2022 was not decoration — it was operational efficiency. PrequaliQ pairs research-led design with implementation teams so interfaces stay usable long after launch.</p>
`,
  },
  {
    slug: "2022-cloud-solutions-migration",
    serviceSlug: "cloud-solutions",
    publishedAt: "2022-06-07T10:00:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80",
    title: "Cloud Solutions: From Migration Projects to Cloud-Native Delivery",
    excerpt:
      "AWS, Azure, Kubernetes, and FinOps shaped how organisations moved workloads off legacy data centres.",
    content: `
<p>Cloud adoption in 2022 was less about “if” and more about “how fast, and how safely.” Many Swedish and European organisations ran hybrid estates: legacy VMs beside container platforms, with identity and networking as the hardest problems to solve.</p>
<h2>Platforms and patterns</h2>
<p><strong>Microsoft Azure</strong> and <strong>AWS</strong> remained the dominant choices for enterprise workloads. <strong>Kubernetes</strong> was the default abstraction for new services, often managed through AKS or EKS to reduce operational overhead. Infrastructure as code — Terraform and Bicep — made environments repeatable and audit-friendly.</p>
<h2>Migration strategies</h2>
<p>Lift-and-shift still happened, but replatforming and refactoring delivered better long-term value. Teams mapped dependencies, classified data sensitivity, and phased cutovers to avoid big-bang outages. Backup, disaster recovery, and regional residency (EU data boundaries) were non-negotiable discussion points.</p>
<h2>FinOps and observability</h2>
<p>Cloud bills became visible to engineering leaders. Tagging policies, reserved instances, and right-sizing exercises were part of mature programmes. Centralised logging (ELK, Azure Monitor, CloudWatch) and alerting reduced mean time to recovery.</p>
<p>PrequaliQ helps organisations plan cloud roadmaps, execute migrations, and build cloud-native applications with cost and compliance in view from day one.</p>
`,
  },
  {
    slug: "2022-system-integration-apis",
    serviceSlug: "system-integration",
    publishedAt: "2022-07-21T16:00:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    title: "System Integration: Connecting the Enterprise with APIs",
    excerpt:
      "REST, GraphQL, iPaaS, and event-driven integration patterns kept data flowing between ERP, CRM, and custom apps.",
    content: `
<p>Most organisations in 2022 did not suffer from a lack of software — they suffered from disconnected software. Integration projects turned isolated systems into a coherent operational picture: orders, inventory, finance, and customer records updating without manual re-entry.</p>
<h2>Integration styles</h2>
<p><strong>REST APIs</strong> remained the workhorse for synchronous calls. <strong>GraphQL</strong> gained traction where mobile and web clients needed flexible queries without over-fetching. For high-volume or decoupled flows, message brokers such as Azure Service Bus, RabbitMQ, or Kafka carried events between services with retry and dead-letter handling.</p>
<h2>iPaaS and custom middleware</h2>
<p>Platforms like MuleSoft, Boomi, or Azure Logic Apps accelerated standard connectors, while custom middleware handled domain-specific rules that no template could capture. The best programmes mixed both: commodity integrations on iPaaS, critical paths engineered in code with full test coverage.</p>
<h2>Quality and governance</h2>
<p>Versioned API contracts, OpenAPI documentation, and sandbox environments reduced breakage when vendors upgraded. Monitoring integration latency and error rates was as important as monitoring application uptime.</p>
<p>PrequaliQ builds integration layers that respect your existing investments — Oracle, Salesforce, .NET services, and modern SaaS — without forcing a rip-and-replace strategy.</p>
`,
  },
  {
    slug: "2022-legacy-modernization-paths",
    serviceSlug: "legacy-modernization",
    publishedAt: "2022-08-10T13:20:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538ac97?auto=format&fit=crop&w=1400&q=80",
    title: "Legacy Modernization: Strangler Fig and Incremental Risk",
    excerpt:
      "How teams replaced ageing systems without stopping the business — microservices, containers, and phased cutovers.",
    content: `
<p>Legacy modernization dominated IT backlogs in 2022. COBOL and early .NET monoliths still ran critical processes, but maintenance costs, security exposure, and shrinking skill pools pushed leaders to act — carefully.</p>
<h2>The strangler fig pattern</h2>
<p>Rather than big-bang rewrites, many programmes routed new functionality through modern services while legacy cores handled stable workloads. API facades wrapped old databases, giving frontends a clean contract while data migration happened in the background.</p>
<h2>Technical targets</h2>
<p>Containers and <strong>Kubernetes</strong> provided a consistent deploy target for refactored modules. <strong>.NET 6</strong> migration paths helped Windows-centric estates move forward. Where appropriate, selected modules moved to managed cloud services to reduce patching burden.</p>
<h2>People and process</h2>
<p>Modernization failed when treated as pure technology. Training, parallel running, and clear rollback plans kept operations teams confident. Knowledge capture from senior maintainers was as valuable as the new codebase.</p>
<p>PrequaliQ modernizes legacy systems in phases — improving security and agility while protecting daily operations.</p>
`,
  },
  {
    slug: "2022-ai-solutions-practical-ml",
    serviceSlug: "ai-solutions",
    publishedAt: "2022-09-15T11:45:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    title: "AI Solutions: Practical Machine Learning Before the LLM Wave",
    excerpt:
      "MLOps, predictive models, and intelligent automation in the year before ChatGPT changed the conversation.",
    content: `
<p>In 2022, enterprise AI was mostly about <strong>practical machine learning</strong> — not Hollywood robots. Teams deployed models for forecasting, document classification, anomaly detection, and recommendation — embedded inside existing workflows rather than standalone science projects.</p>
<h2>MLOps and responsible delivery</h2>
<p>Model training was only half the story. <strong>MLOps</strong> practices — versioned datasets, reproducible pipelines, monitoring for drift, and rollback paths — separated pilots from production. Azure ML, AWS SageMaker, and open-source stacks (MLflow, Kubeflow) supported end-to-end lifecycles.</p>
<h2>Use cases that worked</h2>
<p>Invoice extraction, support ticket routing, demand planning, and quality inspection on production lines delivered measurable ROI. Natural language processing existed (BERT-era models), but large-language-model chat was not yet the default interface — that shift arrived later in the year with broader awareness of GPT-class systems.</p>
<h2>Ethics and GDPR</h2>
<p>EU organisations scrutinised training data, purpose limitation, and human oversight. Explainability and audit trails mattered in regulated sectors.</p>
<p>PrequaliQ focuses on AI that attaches to real business processes — with clear metrics, maintainable pipelines, and governance appropriate to your industry.</p>
`,
  },
  {
    slug: "2022-data-analytics-insights",
    serviceSlug: "data-analytics",
    publishedAt: "2022-10-05T15:10:00+02:00",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    title: "Data & Analytics: From Dashboards to Decisions",
    excerpt:
      "Power BI, SQL warehouses, and data governance helped leaders see operational reality in near real time.",
    content: `
<p>Data and analytics matured in 2022 from “reporting after the fact” to operational decision support. Finance, operations, and product teams expected dashboards that refreshed reliably — and definitions everyone trusted.</p>
<h2>Modern data stacks</h2>
<p>Cloud data warehouses (<strong>Snowflake</strong>, <strong>BigQuery</strong>, <strong>Synapse</strong>) and lakehouse concepts simplified large-scale storage. <strong>dbt</strong> popularised analytics engineering: tested SQL transformations in version control. <strong>Power BI</strong> and Tableau remained staples for business-facing visualisation.</p>
<h2>Data quality and governance</h2>
<p>Garbage-in still meant garbage-out. Master data management, column-level lineage, and role-based access reduced conflicting KPIs across departments. GDPR and internal policy required knowing who could see personal or financial data — and why.</p>
<h2>Self-service with guardrails</h2>
<p>Empowered analysts worked faster when IT provided certified datasets and semantic models. Ad hoc Excel exports slowed as curated datasets became the norm.</p>
<p>PrequaliQ helps organisations connect source systems, model data responsibly, and build reporting that teams actually use — not shelf-ware.</p>
`,
  },
  {
    slug: "2022-dedicated-teams-model",
    serviceSlug: "dedicated-teams",
    publishedAt: "2022-02-16T09:30:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    title: "Dedicated Teams: Scaling Delivery Without Losing Context",
    excerpt:
      "Remote-ready squads, Scrum ceremonies, and long-term product ownership filled skills gaps across Europe.",
    content: `
<p>Hiring every specialist locally was difficult in 2022. Dedicated development teams — embedded with product owners, working in the client’s tools and ceremonies — gave organisations velocity without the overhead of permanent headcount for short-term peaks.</p>
<h2>How the model worked</h2>
<p>A stable squad typically included backend and frontend engineers, QA, and sometimes UX or DevOps skills. Teams joined existing backlogs, participated in sprint planning and retrospectives, and stayed long enough to understand domain nuance — not just ticket text.</p>
<h2>Remote collaboration norms</h2>
<p>Slack, Teams, Jira, Azure DevOps, and GitHub were the daily workspace. Clear written specs, recorded demos, and overlapping core hours across time zones kept distributed work productive. Security policies (VPN, MFA, device management) applied to external squads the same as internal staff.</p>
<h2>When it made sense</h2>
<p>Product roadmaps spanning multiple quarters, platform rebuilds, and ERP extensions were strong fits. Short one-off tasks were better handled as fixed-scope projects.</p>
<p>PrequaliQ provides dedicated teams that behave like an extension of your organisation — transparent communication, shared accountability, and delivery you can plan around.</p>
`,
  },
  {
    slug: "2022-it-consulting-roadmaps",
    serviceSlug: "it-consulting",
    publishedAt: "2022-11-17T14:00:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
    title: "IT Consulting: Roadmaps That Survived Budget Cycles",
    excerpt:
      "Enterprise architecture, vendor selection, and digital transformation planning in a cautious economic climate.",
    content: `
<p>IT consulting in 2022 sat between ambition and restraint. Boards still wanted digital progress, but inflation, supply-chain uncertainty, and talent shortages demanded sharper prioritisation. Consultants who linked technology choices to business cases earned trust.</p>
<h2>Architecture and assessment</h2>
<p>Current-state reviews mapped applications, integrations, and technical debt. Target architectures balanced cloud adoption, security baselines (Zero Trust discussions were mainstream), and maintainability. TOGAF and lighter-weight frameworks both appeared — pragmatism beat dogma.</p>
<h2>Vendor and platform decisions</h2>
<p>Oracle Cloud, Microsoft stacks, Salesforce, and bespoke .NET estates all required honest fit-gap analysis. Proof-of-concept phases de-risked large commitments before multi-year contracts were signed.</p>
<h2>Programme governance</h2>
<p>Steering groups, KPI tracking, and change management kept programmes aligned when priorities shifted mid-year. Consultants who could speak to finance and operations — not only engineering — helped sponsors defend investment.</p>
<p>PrequaliQ consulting engagements focus on actionable roadmaps: what to do first, what to defer, and how to measure success.</p>
`,
  },
  {
    slug: "2022-maintenance-support-operations",
    serviceSlug: "maintenance-support",
    publishedAt: "2022-12-08T10:40:00+01:00",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    title: "Maintenance & Support: Keeping Production Systems Healthy",
    excerpt:
      "SLAs, security patching, observability, and continuous improvement for business-critical applications.",
    content: `
<p>Launch day is visible; maintenance is where reliability is won or lost. In 2022, organisations depended on applications that had been rushed online during earlier crisis years — now those systems needed sustainable care: patches, monitoring, performance tuning, and small enhancements.</p>
<h2>Operational practices</h2>
<p>Defined <strong>SLAs</strong> for response and resolution times set expectations. On-call rotations, incident runbooks, and post-incident reviews reduced repeat outages. Centralised logging and APM tools (Application Insights, Datadog, Grafana stacks) shortened diagnosis time.</p>
<h2>Security maintenance</h2>
<p>Dependency scanning, OS patching, and certificate rotation were continuous tasks — especially after high-profile supply-chain vulnerabilities reminded everyone that idle systems were not safe systems. SBOM discussions entered vendor reviews.</p>
<h2>Evolutionary improvement</h2>
<p>Good support was not frozen software. Small UX fixes, report tweaks, and integration adjustments kept systems aligned with business change without starting new mega-projects.</p>
<p>PrequaliQ maintenance and support services keep your applications secure, observable, and ready for the next feature — not just the last outage.</p>
`,
  },
];

export const blogPosts = blogPosts2022;
