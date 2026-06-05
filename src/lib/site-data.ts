export const siteConfig = {
  name: "PrequaliQ",
  tagline: "Your Trusted ERP Solution Provider",
  description:
    "Welcome to PrequaliQ, your trusted partner for comprehensive and innovative solutions designed to elevate your business. Our dedicated team of experts is committed to helping organisations of all sizes harness the power of cutting-edge technologies to drive growth, enhance operational efficiency, and achieve lasting success.",
  email: "info@prequaliq.com",
  phones: ["+46 73 334 74 40", "+971 50 8929 942"],
  address: "Skandiavägen 35, 182 63 DJURSHOLM, Sweden",
  logo: "/images/logo.png",
  social: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Our Products",
    href: "/products",
    children: [
      { label: "PrequaliQ App", href: "/products/prequaliq-app" },
      { label: "ERP System", href: "/products/erp-system" },
      { label: "AI Command Center", href: "/products/ai-command-center" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Oracle", href: "/services/oracle" },
      { label: "Ruby on Rails", href: "/services/ruby-on-rails" },
      { label: "Salesforce", href: "/services/salesforce" },
    ],
  },
  {
    label: "Who We Are",
    href: "/team",
    children: [{ label: "Meet The Team", href: "/team" }],
  },
];

export const footerLinks = {
  helpAndAdvice: [
    { label: "How it Work", href: "/contact" },
    { label: "24x7 Customer Support", href: "/contact" },
    { label: "Term & Condition", href: "/contact" },
    { label: "Privacy Policy", href: "/contact" },
  ],
  quickLinks: [
    { label: "Open Source", href: "/services/ruby-on-rails" },
    { label: "Faster Performance", href: "/products" },
    { label: "Term & Condition", href: "/contact" },
    { label: "Privacy Policy", href: "/contact" },
  ],
};

export const services = [
  {
    slug: "salesforce",
    title: "Salesforce",
    shortDescription:
      "We specialise in delivering top-notch Salesforce technical consultation services tailored to businesses of all sizes.",
    description:
      "We specialise in delivering top-notch Salesforce technical consultation services tailored to businesses of all sizes. With our extensive expertise in Salesforce technology, we empower our clients to maximise the value of their Salesforce investment, driving growth and success.",
    features: [
      "Custom Salesforce Solutions",
      "Salesforce Configuration and Implementation",
      "Salesforce Integration",
      "Salesforce Administration and Support",
      "Salesforce Consulting",
      "Salesforce Training",
      "Salesforce Managed Services",
    ],
    icon: "cloud",
    hasDetailPage: true,
  },
  {
    slug: "oracle",
    title: "Oracle Business Solutions",
    shortDescription:
      "Oracle business automations and custom solutions with Oracle APEX (Application Express).",
    description:
      "We specialise in Oracle business automations and custom solutions with Oracle APEX (Application Express) which is a dynamic low-code development platform that empowers businesses to create robust web applications with a focus on ERP and CRM functionalities, enhancing operational efficiency and customer relationship management.",
    features: [
      "Oracle APEX Applications Development",
      "Oracle E-Business Suite (EBS) Implementation",
      "Oracle Cloud Fusion Implementation",
      "Oracle Human Capital Management (HCM)",
      "Oracle Application Development Framework (ADF)",
    ],
    icon: "database",
    hasDetailPage: true,
  },
  {
    slug: "ruby-on-rails",
    title: "Ruby on Rails",
    shortDescription:
      "Top-notch open source web applications with Ruby on Rails and technical consultation services.",
    description:
      "We specialise in delivering top-notch open source web applications with Ruby on Rails and with its technical consultation services tailored to businesses of all sizes. With our extensive expertise in Ruby on Rails technology, we empower our clients to maximize the value of their business investment, driving growth and success.",
    features: [
      "Custom Application Development",
      "API Development and Integration",
      "Open-Source Solutions",
      "Angular Development",
      "Maintenance and Support",
    ],
    icon: "code",
    hasDetailPage: true,
  },
  {
    slug: "netsuite",
    title: "NetSuite",
    shortDescription:
      "Exceptional NetSuite development and implementation services tailored to businesses of all sizes.",
    description:
      "We specialize in providing exceptional NetSuite development and implementation services tailored to businesses of all sizes. With our extensive expertise in NetSuite, we help clients optimize their operations, streamline processes, and maximize their business investment, driving growth and success.",
    features: [
      "NetSuite implementation and migration",
      "Custom workflows and scripting",
      "Financial and inventory modules",
      "Third-party integrations",
    ],
    icon: "layers",
    hasDetailPage: false,
  },
];

export const products = [
  {
    slug: "prequaliq-app",
    title: "PrequaliQ App",
    shortDescription:
      "A dynamic procurement system (DIS) and qualification system for the public sector.",
    description:
      "PrequaliQ är ett dynamiskt inköpssystem, DIS och kvalificeringssystem utvecklat för offentlig sektor som hjälper svenska upphandlande enheter att genomföra effektivare upphandlingsprocesser. Leverantörerna i PrequaliQ är kvalificerade och intresserade att utveckla sina affärer med offentlig sektor. PrequaliQ underlättar och ger en smidigare upphandling för både köpare och säljare i den offentliga affären.",
    features: [
      "CPV-kod och NUTS-kod sökfunktion",
      "Tvåstegs upphandlingsprocess",
      "Unika hemsidor för upphandlare och leverantörer",
      "Årlig revision av alla leverantörer",
    ],
    sections: [
      {
        title: "Detta är PrequaliQ",
        content:
          "I PrequaliQ förenas affärsnytta med användarvänlighet både för upphandlare och leverantörer. Både upphandlare och leverantörer får sina egna unika ”hemsidor” genom vilka de genomför avropen respektive lämnar anbud. Upphandlare får tillgång till PrequaliQ:s sökfunktion med vilka de söker bland mängder av leverantörer med hjälp av CPV-koderna. För att hitta leverantörer i sin närhet görs sökningar på NUTS-koderna. Ytterligare sökparameterar i sökfunktionen är omsättning och certifieringar inom flera områden. En lista för varje sökning innehållande sökparametrar och matchande leverantörsföretag med kontaktuppgifter är en given egenskap i PrequaliQ. För leverantörer görs ansökan om att bli kvalificerad på någon timme. Varje leverantör får sin egen unika hemsida. Upphandlingar genomförs genom ett selektivt förfarande i en tvåstegsprocess. Enkelhet och tidseffektivitet är PrequaliQ:s värdegrund.",
      },
      {
        title: "PrequaliQ för upphandlare",
        content:
          "Hitta dina lämpligaste leverantörer i varje enskild upphandling. PrequaliQ är till för kommuner, regioner och upphandlande myndigheter som gör inköp enligt lag (2016:1145) om offentlig upphandling, LOU eller lag (2016:1146) om upphandling inom försörjningssektorerna (LUF). Alla leverantörer i PrequaliQ är noggrant granskade. Granskningen omfattar bland annat finansiell ställning, verksamhetsinriktning, strukturerat miljö- och kvalitetsarbete och referenser. PrequaliQ kontrollerar att samtliga åtagande gällande skatter, registreringar och avgifter är uppfyllda samt att inga uteslutningsgrunder föreligger. PrequaliQ gör årliga revisioner av samtliga leverantörer.",
      },
      {
        title: "PrequaliQ för leverantörer",
        content:
          "Få unik tillgång till offentliga affärer. Kvalificerade leverantörer i PrequaliQ får unik tillgång till upphandlingar och affärer. Leverantörer ansöker om att bli kvalificerade i PrequaliQ. En noggrann granskning av leverantörerna görs av PrequaliQ och de som klarar kraven blir kvalificerade för upphandlingar. Kvalificerade leverantörer blir automatiskt kvalificerade för alla upphandlingar inom sin bransch som upphandlande myndigheter genomför i systemet. Årligen görs en granskning av alla leverantörer.",
      },
    ],
  },
  {
    slug: "erp-system",
    title: "ERP System",
    shortDescription:
      "State-of-the-art ERP solution developed using Oracle APEX for streamlined business operations.",
    description:
      "Our state-of-the-art ERP solution, developed using Oracle APEX, offers a comprehensive suite of modules designed to streamline and optimize your business operations. This user-friendly platform provides robust functionality, real-time insights, and enhances decision-making processes, ensuring your business runs smoothly and efficiently.",
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
        title: "ERP Product Overview",
        content:
          "Our state-of-the-art ERP solution, developed using Oracle APEX, offers a comprehensive suite of modules designed to streamline and optimize your business operations. This user-friendly platform provides robust functionality, real-time insights, and enhances decision-making processes, ensuring your business runs smoothly and efficiently.",
      },
      {
        title: "User Dashboards",
        content:
          "Our ERP solution features intuitive user dashboards that provide quick access to essential data and metrics, including Top Ten Customers, Total # of Distributor Setup, Total # of Working Distributors, Total # of Mobile App Users, Customer Universe, MTD Productive Customers, Top Ten Distributors, and Top Ten Products.",
      },
      {
        title: "Detailed Analytics",
        content:
          "Our ERP system provides in-depth analytics to help you make informed business decisions. Access sales trends, inventory dashboards, productivity dashboards, and more. Key analytics include Total Orders vs Total Invoiced, Open DSS vs Closed DSS, DSS vs Cash Register, Sale Invoices Value and Count, Sale Return Value and Count, and MTD Discount Value.",
      },
      {
        title: "Customization and Flexibility",
        content:
          "Our ERP solution is highly customizable, allowing you to adapt it to your unique business processes. Whether you need to manage complex supply chains or simple inventory systems, our ERP can be tailored to fit your needs. The flexibility in user role management and system configuration ensures that your ERP system grows with your business.",
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
  {
    slug: "ai-command-center",
    title: "AI Command Center",
    shortDescription:
      "Advanced Oracle APEX application that automates personalized email communications using AI.",
    description:
      "Introducing Command Center, an advanced application developed using Oracle APEX, designed to seamlessly integrate with your existing CRM or ERP systems. Command Center automates the process of generating and sending personalized emails to your customers and clients, whether for invitations, follow-ups, campaigns, or other communications. Leveraging the power of AI with the ChatGPT model, this powerful tool caters to both individuals and businesses.",
    features: [
      "Integration with CRM/ERP Systems",
      "Excel Data Upload",
      "Automated Email Templates",
      "Scheduling and Tracking",
    ],
    sections: [
      {
        title: "Command Center Overview",
        content:
          "Introducing Command Center, an advanced application developed using Oracle APEX, designed to seamlessly integrate with your existing CRM or ERP systems. Command Center automates the process of generating and sending personalized emails to your customers and clients, whether for invitations, follow-ups, campaigns, or other communications. Leveraging the power of AI with the ChatGPT model, this powerful tool caters to both individuals and businesses, enhancing your communication strategy and saving you valuable time.",
      },
      {
        title: "User Onboarding and Support",
        content:
          "New users can sign up using their Google accounts, allowing for a quick start with basic features available for demo purposes. Access detailed dashboards, user guides and tutorials to get the most out of Command Center. Our support team is always available to assist with any issues or questions.",
      },
      {
        title: "Customization and Flexibility",
        content:
          "Create and save custom email templates to match your brand's voice and style. Utilize advanced filtering and segmentation options to target specific customer groups based on various criteria such as purchase history, location, and engagement level.",
      },
    ],
    featureDetails: [
      {
        title: "Integration with CRM/ERP Systems",
        items: [
          "Connect to various CRM and ERP systems, pulling in real-time data.",
          "Maintain data consistency and reduce the need for manual data entry.",
        ],
      },
      {
        title: "Excel Data Upload",
        items: [
          "Upload customer data through Excel files for users without CRM/ERP systems.",
          "Ensure small businesses can take full advantage of the application's capabilities.",
        ],
      },
      {
        title: "Automated Email Templates",
        items: [
          "Choose from pre-designed email templates or create your own.",
          "Customize templates with dynamic data fields for personal, relevant emails.",
        ],
      },
      {
        title: "Scheduling and Tracking",
        items: [
          "Schedule emails to be sent at optimal times based on engagement data.",
          "Track delivery rates, open rates, and click-through rates with detailed analytics.",
        ],
      },
    ],
  },
];

export const serviceDetails: Record<
  string,
  { title: string; sections: { heading: string; content: string; items?: string[] }[] }
> = {
  salesforce: {
    title: "Salesforce CRM Development",
    sections: [
      {
        heading: "Custom Salesforce Solutions",
        content:
          "We build custom Salesforce applications tailored to your unique business requirements, enhancing your CRM capabilities and user experience. Our custom solutions help streamline your business processes, automate workflows, and provide you with the tools needed to manage customer relationships more effectively.",
      },
      {
        heading: "Salesforce Configuration and Implementation",
        content:
          "Our team provides comprehensive configuration and implementation services, ensuring a smooth setup of your Salesforce CRM system. We work closely with you to understand your business needs and configure Salesforce to support your sales, service, marketing, and other customer-facing processes.",
      },
      {
        heading: "Salesforce Integration",
        content:
          "We integrate Salesforce with other enterprise systems, ensuring seamless data flow and improved operational efficiency across your business processes. Our integration services include connecting Salesforce with ERP systems, marketing automation tools, customer support platforms, and more.",
      },
      {
        heading: "Salesforce Administration and Support",
        content:
          "We offer ongoing administration and support services to ensure your Salesforce applications run efficiently and adapt to your evolving business needs. Our services include user management, system customization, troubleshooting, and regular updates.",
      },
      {
        heading: "Salesforce Consulting",
        content: "Strategic consulting to help you define and implement a Salesforce roadmap aligned with your business goals.",
        items: [
          "Salesforce Strategy and Roadmap",
          "Process Optimization and Automation",
          "Data Migration and Management",
        ],
      },
      {
        heading: "Salesforce Training",
        content: "Comprehensive training programs for end-users, administrators, and developers.",
        items: [
          "End-User Training",
          "Administrator and Developer Training",
          "Ongoing Support and Education",
        ],
      },
      {
        heading: "Salesforce Managed Services",
        content:
          "Full-service Salesforce management including system monitoring, performance optimization, user support, and regular maintenance. Each of these services is designed to help you maximize the value of your Salesforce investment.",
        items: [
          "Full-Service Salesforce Management",
          "Customization and Enhancement",
          "Performance Monitoring and Reporting",
        ],
      },
    ],
  },
  oracle: {
    title: "Solutions Innovative To Move Your Business Forward.",
    sections: [
      {
        heading: "Oracle APEX Applications Development",
        content: "We specialize in the development of robust, scalable, and secure applications using Oracle Applications with Oracle APEX.",
        items: [
          "Custom Application Development — tailored applications that meet your specific business needs.",
          "Database Design and Management — efficient database solutions for optimal performance and data integrity.",
          "Application Maintenance and Support — ongoing support including updates, performance tuning, and bug fixes.",
          "Migration Services — seamless migration of existing applications to Oracle APEX.",
        ],
      },
      {
        heading: "Oracle E-Business Suite (EBS)",
        content:
          "Comprehensive Oracle EBS implementation services with customization, integration, upgrade and migration, plus ongoing support and maintenance.",
      },
      {
        heading: "Oracle Cloud Fusion",
        content:
          "Implementation and configuration of Oracle Cloud Fusion applications for ERP, SCM, HCM, and CX. Custom development, integration services, and training and support.",
      },
      {
        heading: "Oracle Human Capital Management (HCM)",
        content:
          "End-to-end Oracle HCM implementation, customization and development, integration and data migration, plus ongoing support and training.",
      },
      {
        heading: "Oracle Application Development Framework (ADF)",
        content:
          "Custom application development, UI/UX design and development, integration services, and support and maintenance using Oracle ADF.",
      },
    ],
  },
  "ruby-on-rails": {
    title: "Solutions Innovative To Move Your Business Forward.",
    sections: [
      {
        heading: "Our Ruby on Rails Development Services",
        content:
          "We provide expert Ruby on Rails development services for building high-quality, scalable web applications.",
        items: [
          "Custom Application Development — custom web applications tailored to meet your business needs.",
          "API Development and Integration — create and integrate APIs to enhance application functionality.",
          "Open-Source Solutions — cost-effective solutions leveraging open-source tools and libraries.",
          "Angular Development — dynamic, single-page applications for enhanced user experience.",
          "Maintenance and Support — continuous support to keep applications running smoothly.",
        ],
      },
      {
        heading: "Comprehensive Services",
        content: "Partner with us to leverage the full potential of Ruby on Rails and drive your business forward.",
        items: [
          "Custom Web Application Development",
          "API Development and Integration",
          "E-commerce Solutions",
          "Maintenance and Support",
          "Migration Services",
          "Performance Optimization",
        ],
      },
    ],
  },
};

export const whyChooseUs = {
  intro: "Deep expertise in Salesforce technology.",
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
  title: "Oracle Apex and Fusion Apps",
  subtitle: "(what we offer in Oracle)",
  description:
    "Oracle APEX (Application Express) is a dynamic low-code development platform that empowers businesses to create robust web applications with a focus on ERP and CRM functionalities, enhancing operational efficiency and customer relationship management.",
  features: [
    {
      title: "Application Development",
      description:
        "Utilise Oracle APEX to design and develop tailored ERP and CRM applications that address your organisation's specific needs.",
    },
    {
      title: "Training and Support",
      description:
        "Empower your team with comprehensive training and ongoing support to leverage the full potential of Oracle APEX for ERP and CRM development.",
    },
    {
      title: "Data Cleansing and Deduplication",
      description:
        "Cleanse and deduplicate data within your Oracle APEX ERP and CRM applications to ensure data accuracy, consistency, and integrity.",
    },
    {
      title: "Mobile App Development",
      description:
        "Develop custom mobile applications integrated with Oracle APEX to provide anytime, anywhere access to critical ERP and CRM functionalities.",
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
    date: "September 08, 2021",
    title: "ROR Open Source Web Applications",
    href: "/services/ruby-on-rails",
  },
  {
    date: "September 08, 2021",
    title: "Salesforce CRM Development",
    href: "/services/salesforce",
  },
  {
    date: "September 08, 2021",
    title: "Oracle Apex ERP and Analytical Solutions",
    href: "/services/oracle",
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
      "Our mission is to leverage the power of technology to drive growth, efficiency, and success for our clients.",
  },
];

export const whoWeAre = {
  title: "Who We Are?",
  description:
    "We are a team of dedicated professionals committed to delivering innovative and customised technology solutions. With extensive expertise in Salesforce, Oracle, NetSuite, and Ruby on Rails, we help businesses of all sizes harness the power of these platforms to achieve their goals.",
};

export const whatWeOffer = {
  title: "what we offer",
  description:
    "At PrequaliQ, we offer comprehensive solutions across Salesforce, Oracle, NetSuite, and Ruby on Rails to drive your business forward. Our expert team provides tailored solutions to meet your unique business needs.",
};

export const contactPage = {
  title: "Contact Us",
  subtitle: "Tell Us About Your Project",
  formTitle: "Send Us Message",
};
