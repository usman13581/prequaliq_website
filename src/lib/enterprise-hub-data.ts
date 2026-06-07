export type EnterpriseHubModule = {
  title: string;
  description: string;
  image: string;
  highlights: string[];
};

export type EnterpriseHubScreenshot = {
  title: string;
  caption: string;
  image: string;
};

export type ImplementationHighlight = {
  title: string;
  description: string;
};

export const enterpriseHubContent = {
  title: "Enterprise Hub",
  tagline: "A unified ERP platform — customized, deployment-ready, and built for real operations",
  shortDescription:
    "A fully integrated enterprise resource planning platform, tailored to your workflows and ready for production rollout.",
  heroImage:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",

  whatIsErp: {
    title: "What is Enterprise Resource Planning?",
    content:
      "Enterprise Resource Planning (ERP) brings your core business functions — finance, sales, purchasing, inventory, HR, and operations — into one connected system. Instead of scattered spreadsheets and disconnected tools, your teams work from a single source of truth: live data, shared workflows, and consistent processes across departments.",
    secondary:
      "Enterprise Hub is our ready-to-deploy ERP solution. We customize modules, workflows, and reporting to match how your organisation actually runs — then implement, train your teams, and support you through go-live and beyond.",
  },

  readyForImplementation: {
    title: "Customized and ready for implementation",
    content:
      "Enterprise Hub is not a generic off-the-shelf install. It is a proven ERP foundation that we adapt to your chart of accounts, approval chains, product catalogues, warehouse structure, and reporting needs. Configuration, data migration, user training, and phased rollout are part of our delivery — so you move from planning to production with confidence.",
    points: [
      "Pre-built modules for finance, sales, procurement, inventory, and HR",
      "Workflow and form customization without rebuilding from scratch",
      "Role-based access, audit trails, and multi-company support",
      "Web and mobile access for field teams and management on the go",
      "Structured implementation methodology with clear milestones",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },

  modules: [
    {
      title: "Financial Management",
      description:
        "General ledger, accounts payable and receivable, tax handling, and financial reporting — all connected to operational transactions in real time.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Automated journal entries from sales and purchases",
        "Multi-currency and cost centre tracking",
        "P&L, balance sheet, and cash flow reporting",
      ],
    },
    {
      title: "Sales & CRM",
      description:
        "Manage the full sales cycle from quotation to delivery and invoicing, with customer history and pipeline visibility in one place.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Quotations, sales orders, and delivery notes",
        "Customer and distributor management",
        "Sales analytics and performance dashboards",
      ],
    },
    {
      title: "Procurement",
      description:
        "Streamline purchasing from requisition and supplier quotation through purchase order, goods receipt, and supplier payment.",
      image:
        "https://images.unsplash.com/photo-1578575437136-527eed3abbcd?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Supplier catalogues and purchase workflows",
        "Three-way matching: PO, receipt, invoice",
        "Spend analysis and budget control",
      ],
    },
    {
      title: "Inventory & Warehouse",
      description:
        "Track stock across locations, manage transfers and adjustments, and link inventory movements directly to sales and production.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Multi-warehouse stock levels and valuation",
        "Batch and serial tracking where required",
        "Reorder rules and stock ageing reports",
      ],
    },
    {
      title: "Human Resources",
      description:
        "Employee records, attendance, leave, payroll integration, and organisational structure — supporting HR alongside daily operations.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Employee lifecycle and document management",
        "Leave and attendance tracking",
        "Payroll-ready data export and approvals",
      ],
    },
    {
      title: "Analytics & Dashboards",
      description:
        "Executive and operational dashboards surface the metrics that matter — sales trends, inventory health, receivables, and productivity.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Role-based dashboards for management and teams",
        "Drill-down from summary KPIs to transactions",
        "Exportable reports for audits and planning",
      ],
    },
  ] satisfies EnterpriseHubModule[],

  implementations: {
    title: "Proven through successful implementations",
    intro:
      "We have delivered Enterprise Hub across multiple organisations — from initial discovery and customization through go-live, user adoption, and ongoing support. Each engagement is shaped around the client's industry, scale, and operational priorities.",
    highlights: [
      {
        title: "End-to-end delivery",
        description:
          "Discovery, configuration, data migration, UAT, training, and production rollout — managed as a structured programme, not a one-off install.",
      },
      {
        title: "Industry-aligned customization",
        description:
          "Workflows, forms, and reports adapted for distribution, retail, services, and multi-branch operations based on real client requirements.",
      },
      {
        title: "Adoption and support",
        description:
          "Hands-on training, documentation, and post go-live support so teams use the system confidently from day one.",
      },
      {
        title: "Measurable outcomes",
        description:
          "Clients report faster order processing, clearer financial visibility, reduced manual reconciliation, and better inventory control after rollout.",
      },
    ] satisfies ImplementationHighlight[],
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },

  screenshots: [
    {
      title: "Executive dashboard",
      caption: "Real-time KPIs for sales, inventory, and receivables at a glance.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Sales & order management",
      caption: "Track quotations, orders, and fulfilment in one connected workflow.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973de0a2355?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Inventory overview",
      caption: "Stock levels, movements, and warehouse activity updated live.",
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a394b699b0?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Financial reporting",
      caption: "Structured reports for accounting, audit, and management review.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    },
  ] satisfies EnterpriseHubScreenshot[],

  implementationSteps: [
    { step: "01", title: "Discovery", description: "Map processes, pain points, and integration needs." },
    { step: "02", title: "Configuration", description: "Customize modules, workflows, roles, and reports." },
    { step: "03", title: "Migration & testing", description: "Import master data, validate transactions, run UAT." },
    { step: "04", title: "Go-live & support", description: "Train users, launch production, and provide ongoing care." },
  ],
};
