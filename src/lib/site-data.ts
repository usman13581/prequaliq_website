export const siteConfig = {
  name: "PrequaliQ",
  tagline: "Enterprise Web & Mobile App Development",
  description:
    "Welcome to PrequaliQ, your trusted partner for enterprise solutions and custom application development. We design and build scalable web and mobile applications that help organisations of all sizes streamline operations, integrate systems, and accelerate digital growth.",
  email: "info@prequaliq.com",
  phones: ["+46 73 334 74 40", "+46 76 178 00 17"],
  address: "Anundvägen 5, 182 54 Djursholm, Sweden",
  foundedYear: 2022,
  foundedIn: "Stockholm, Sweden",
  logo: "/images/logo.png",
  social: {
    facebook: "#",
    twitter: "#",
    linkedin: "https://www.linkedin.com/company/prequaliq",
    instagram: "#",
  },
};

export const navLinks: {
  label: string;
  href: string;
  megaMenu?: boolean;
  children?: { label: string; href: string }[];
}[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Products",
    href: "/products",
    children: [
      { label: "E-Procurement system", href: "/products/prequaliq-apps" },
      { label: "Enterprise Hub", href: "/products/enterprise-hub" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    megaMenu: true,
  },
  {
    label: "Who We Are",
    href: "/team",
    children: [{ label: "Meet The Team", href: "/team" }],
  },
];

export type FooterLink = {
  label: string;
  href?: string;
  legal?: "privacy" | "terms";
};

export const footerLinks = {
  helpAndAdvice: [
    { label: "How it Works", href: "/contact" },
    { label: "Customer Support", href: "/contact" },
    { label: "Privacy Policy", legal: "privacy" },
    { label: "Terms & Conditions", legal: "terms" },
  ] satisfies FooterLink[],
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/services" },
    { label: "Our Products", href: "/products" },
    { label: "Meet The Team", href: "/team" },
  ] satisfies FooterLink[],
};

export const homeServiceHighlights = [
  {
    title: "Application Development",
    shortDescription: "Web and mobile applications tailored to your business needs.",
    href: "/services/web-and-mobile-apps",
    icon: "apps",
  },
  {
    title: "Cloud & Integration",
    shortDescription: "Connect systems, migrate to the cloud, and modernise legacy software.",
    href: "/services/cloud-solutions",
    icon: "cloud",
  },
  {
    title: "Intelligence & Automation",
    shortDescription: "AI-powered features and data solutions for smarter operations.",
    href: "/services/ai-solutions",
    icon: "ai",
  },
  {
    title: "Partnership & Support",
    shortDescription: "Dedicated teams, consulting, and ongoing application support.",
    href: "/services/dedicated-teams",
    icon: "team",
  },
];

export const products = [
  {
    slug: "prequaliq-apps",
    title: "E-Procurement system",
    shortDescription:
      "A complete e-procurement system with built-in AI for Swedish authorities, municipalities and regions — from market research to contract signing.",
    description:
      "Prequaliq Apps is a complete e-procurement system with built-in AI functions for the Swedish public sector. Buyers search suppliers by CPV, NUTS, turnover and keywords; both sides use AI for documents; public Q&A keeps the process transparent; after award, communication continues via live chat. The platform also combines supplier qualification with a dynamic purchasing system (DIS).",
    features: [
      "Search by CPV, NUTS, turnover and keywords",
      "Built-in AI for document writing",
      "Public Q&A during procurement",
      "Live chat after contract award",
    ],
    sections: [
      {
        title: "Complete e-procurement",
        content:
          "Prequaliq Apps is a complete e-procurement system with built-in AI for Swedish authorities, municipalities and regions. It supports the full procurement process from market research to signing contracts.",
      },
      {
        title: "Search, AI and communication",
        content:
          "Contracting authorities can search the supplier database using CPV codes, NUTS codes, turnover and specific keywords. Both authorities and suppliers have AI tools that help write documents. The system includes a public Q&A function, and after award the contracting authority communicates with the winning supplier via live chat instead of email.",
      },
      {
        title: "Supplier qualification and dynamic purchasing",
        content:
          "Prequaliq Apps combines supplier qualification with a dynamic purchasing system (DIS). Swedish contracting authorities can search qualified suppliers by industry, location and capacity, then run efficient two-step procurements with already reviewed suppliers.",
      },
    ],
  },
  {
    slug: "enterprise-hub",
    title: "Enterprise Hub",
    shortDescription:
      "A customized ERP platform — integrated, deployment-ready, and proven through successful implementations.",
    description:
      "Enterprise Hub is a unified enterprise resource planning platform that connects finance, sales, procurement, inventory, and HR in one system. Customized to your workflows and ready for production rollout, it gives your organisation real-time visibility and control across every core operation.",
    features: [
      "Application Setup",
      "HR Management",
      "Purchase Management",
      "Sales Management",
      "Account Management",
      "Inventory Management",
    ],
    sections: [
      {
        title: "Platform Overview",
        content:
          "Enterprise Hub offers a comprehensive suite of modules designed to streamline and optimize your business operations. This user-friendly solution provides robust functionality, real-time insights, and enhanced decision-making processes, ensuring your business runs smoothly and efficiently across web and mobile channels.",
      },
      {
        title: "User Dashboards",
        content:
          "Intuitive user dashboards provide quick access to essential data and metrics, including Top Ten Customers, Total # of Distributor Setup, Total # of Working Distributors, Total # of Mobile App Users, Customer Universe, MTD Productive Customers, Top Ten Distributors, and Top Ten Products.",
      },
      {
        title: "Detailed Analytics",
        content:
          "In-depth analytics help you make informed business decisions. Access sales trends, inventory dashboards, productivity dashboards, and more. Key analytics include Total Orders vs Total Invoiced, Open DSS vs Closed DSS, DSS vs Cash Register, Sale Invoices Value and Count, Sale Return Value and Count, and MTD Discount Value.",
      },
      {
        title: "Customization and Flexibility",
        content:
          "Highly customizable to adapt to your unique business processes. Whether you need to manage complex supply chains or streamlined workflows, the platform can be tailored to fit your needs. Flexible user role management and system configuration ensure your solution grows with your business.",
      },
    ],
    featureDetails: [
      {
        title: "Application Setup",
        items: [
          "Customize workflows and set up modules to align with your business processes.",
          "Integrate with existing systems to ensure seamless operations.",
          "User-friendly interface for easy configuration and deployment.",
        ],
      },
      {
        title: "HR Management",
        items: [
          "Manage employee information, track attendance, and process payroll effortlessly.",
          "Automate HR tasks such as leave management, performance appraisals, and recruitment.",
          "Ensure compliance with labor laws and regulations.",
        ],
      },
      {
        title: "Purchase Management",
        items: [
          "Streamline procurement processes from requisition to supplier payment.",
          "Monitor purchase orders, manage suppliers, and control costs.",
          "Generate detailed reports for better procurement planning and forecasting.",
        ],
      },
      {
        title: "Sales Management",
        items: [
          "Enhance sales operations with tools for order management, invoicing, and CRM.",
          "Track sales performance with real-time analytics and reports.",
          "Optimize sales strategies with insights into customer behavior and market trends.",
        ],
      },
      {
        title: "Account Management",
        items: [
          "Maintain accurate financial records with automated accounting processes.",
          "Manage accounts payable and receivable, general ledger, and financial reporting.",
          "Ensure financial transparency and compliance with accounting standards.",
        ],
      },
      {
        title: "Inventory Management",
        items: [
          "Track stock levels, manage warehouse operations, and optimize inventory turnover.",
          "Automate reorder processes and minimize stockouts and overstock situations.",
          "Generate real-time inventory reports for better supply chain management.",
        ],
      },
    ],
  },
];

export const whyChooseUs = {
  intro: "Deep expertise in enterprise web and mobile application development.",
  items: [
    {
      number: "01",
      title: "Proven track record of delivering successful projects.",
      description:
        "A demonstrated history of successful project delivery across enterprise platforms.",
    },
    {
      number: "02",
      title: "Customer centric approach focused on understanding and exceeding client expectations.",
      description:
        "We prioritize understanding your unique needs and consistently strive to exceed expectations.",
    },
    {
      number: "03",
      title: "Commitment to excellence, integrity, and innovation.",
      description:
        "Integrity, innovation, and high-quality delivery are at the core of everything we do.",
    },
  ],
};

export const stats = [
  { value: "1k+", label: "Happy Customers" },
  { value: "A+", label: "Client Satisfaction" },
];

export const oracleSection = {
  title: "Enterprise Web & Mobile Development",
  subtitle: "End-to-end delivery",
  description:
    "From customer-facing portals to internal business tools, we design and build applications that improve how your organisation works — secure, scalable, and aligned with your goals.",
  features: [
    {
      title: "Web Application Development",
      description:
        "Design and develop tailored web applications that address your organisation's specific business and operational needs.",
    },
    {
      title: "Training and Support",
      description:
        "Empower your team with comprehensive training and ongoing support so they get the most from your applications.",
    },
    {
      title: "Data Management",
      description:
        "Improve data quality and consistency across your systems for better reporting and decision-making.",
    },
    {
      title: "Mobile App Development",
      description:
        "Build mobile applications that give your teams and customers access to critical functionality anywhere.",
    },
  ],
  trustedUser: {
    headline: "Trusted By 12,000 Users, Using Our Software!",
    name: "Hanri Thomas Doe",
    company: "Consultancy Agency",
  },
};

export const managementSection = {
  title: "Your Base For Classic, Agile Or Project Management",
  description:
    "On the other hand we denounce with righteous indignation dislike men who are so beguiled and demoralized.",
  features: [
    {
      title: "Protect Your Data And Privacy",
      description:
        "Enterprise-grade security measures to safeguard your data and ensure privacy compliance.",
    },
    {
      title: "Free And Open Source Software",
      description:
        "Leveraging open-source technologies to deliver cost-effective, flexible solutions.",
    },
  ],
};

export const featuredServices = [
  {
    date: "Enterprise Solutions",
    title: "Web & Mobile Applications",
    href: "/services/web-and-mobile-apps",
  },
  {
    date: "Enterprise Solutions",
    title: "Cloud & System Integration",
    href: "/services/cloud-solutions",
  },
  {
    date: "Enterprise Solutions",
    title: "AI-Powered Solutions",
    href: "/services/ai-solutions",
  },
];

export const teamIntro = {
  title: "Our Team",
  subtitle: "The Integration Of Information, Design, And Technology",
  tagline: "We denounce with righteous dislike men who are so beguiled. Make your business work worldwide, make your business better.",
  description:
    "Our team is the heart of our success. Their dedication, expertise, and passion drive us to deliver exceptional results for our clients. Each member brings unique skills and a commitment to excellence, ensuring we meet and exceed expectations. Together, we are dedicated to fostering innovation, collaboration, and growth, making PrequaliQ a leader in our industry.",
};

export const team = [
  { name: "Sara Lange", role: "Business Solutions Consultant" },
  { name: "Mr. Usman Farooq", role: "Oracle Apps Technical Lead" },
  { name: "Mr. Qasim Malik", role: "ROR Technical Lead" },
  { name: "Mr. Umer Farooq", role: "Oracle Apps Technical Consultant" },
  { name: "Mr. Huraira Iqbal", role: "Sr. Oracle Apex Developer" },
  { name: "Mr. Rizwan Liaqat", role: "Full stack .Net Developer" },
  { name: "Mr. Omer", role: "Salesforce Consultant" },
  { name: "Mr. Hannan Arshad", role: "Sr. Oracle Apex Developer" },
];

export const values = [
  {
    title: "Our Values",
    description:
      "We strive for excellence in everything we do, delivering high-quality solutions and exceeding our clients' expectations.",
  },
  {
    title: "Our Mission",
    description:
      "Our mission is to leverage the power of technology to build enterprise web and mobile applications that drive growth, efficiency, and success for our clients.",
  },
];

export const whoWeAre = {
  title: "Who We Are?",
  description:
    "We are a team of dedicated professionals committed to delivering innovative technology solutions. With deep expertise in enterprise application development, we help businesses of all sizes build digital products that achieve their goals.",
};

export const whatWeOffer = {
  title: "what we offer",
  description:
    "At PrequaliQ, we deliver enterprise solutions through custom web and mobile applications, cloud integration, intelligent automation, and dedicated partnership — helping your organisation grow with the right technology.",
};

export const contactPage = {
  title: "Contact Us",
  subtitle: "Tell Us About Your Project",
  formTitle: "Send Us Message",
};
