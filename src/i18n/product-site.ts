import type { Locale } from "./config";

type Item = { title: string; description: string };
type Section = { title: string; body: string };

export type ProductSiteMessages = {
  brand: { name: string; productName: string; tagline: string; description: string };
  nav: {
    buyers: string;
    suppliers: string;
    platform: string;
    about: string;
    blog: string;
    careers: string;
    contact: string;
    contactSales: string;
    login: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaBuyer: string;
    ctaSupplier: string;
  };
  preferred: {
    eyebrow: string;
    title: string;
    description: string;
    stats: { value: string; label: string }[];
  };
  network: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    items: Item[];
    more: string;
  };
  /** The procurement from first step to finished contract. */
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Section[];
  };
  ai: {
    eyebrow: string;
    title: string;
    description: string;
    items: Item[];
    note: string;
  };
  trust: {
    eyebrow: string;
    title: string;
    items: Item[];
  };
  audiences: {
    eyebrow: string;
    title: string;
    buyers: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
      href: string;
    };
    suppliers: {
      title: string;
      subtitle: string;
      description: string;
      cta: string;
      href: string;
    };
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  cta: { title: string; description: string; button: string };
  buyersPage: {
    breadcrumb: string;
    title: string;
    description: string;
    sections: Section[];
  };
  suppliersPage: {
    breadcrumb: string;
    title: string;
    description: string;
    sections: Section[];
  };
  platformPage: {
    breadcrumb: string;
    title: string;
    description: string;
    groupsEyebrow: string;
    groupsTitle: string;
    /** Feature lists by who uses them. */
    groups: { title: string; subtitle: string; items: string[] }[];
  };
  footer: {
    blurb: string;
    buyersTitle: string;
    suppliersTitle: string;
    companyTitle: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
};

export const productSiteEn: ProductSiteMessages = {
  brand: {
    name: "PrequaliQ",
    productName: "Prequaliq",
    tagline: "Public e-procurement for Sweden",
    description:
      "Prequaliq is the AI-assisted public procurement platform for Swedish authorities, municipalities, regions and suppliers. It covers supplier qualification, tendering with sealed bids, evaluation, award and contract follow-up in one system.",
  },
  nav: {
    buyers: "Buyers",
    suppliers: "Suppliers",
    platform: "Platform",
    about: "About",
    blog: "Insights",
    careers: "Careers",
    contact: "Contact",
    contactSales: "Contact sales",
    login: "Log in",
  },
  hero: {
    eyebrow: "Swedish public procurement",
    title: "Sweden’s AI-assisted public procurement platform",
    description:
      "Prequaliq brings public buyers and qualified suppliers together in one system. Buyers plan, publish, evaluate and award. Suppliers qualify once, bid on the tenders that fit them and deliver under contract. Every step is recorded, and AI helps with the writing.",
    ctaBuyer: "I am a buyer",
    ctaSupplier: "Create free supplier account",
  },
  preferred: {
    eyebrow: "One platform",
    title: "One system from supplier qualification to finished contract",
    description:
      "Prequaliq replaces the mix of portals, spreadsheets and email threads. Qualification, tendering, questions, bids, evaluation, award and contract follow-up share one record, in English and Swedish.",
    stats: [
      { value: "End to end", label: "Plan, publish, evaluate, award and follow up the contract in one workflow" },
      { value: "Qualified", label: "Suppliers are reviewed once, approved, and re-qualified every year" },
      { value: "Sealed", label: "Bids stay closed to the buyer until the deadline has passed" },
    ],
  },
  network: {
    eyebrow: "Procurement network",
    title: "A stronger way to connect public buyers and suppliers in Sweden",
    description:
      "Prequaliq connects contracting authorities and suppliers on one platform, so it is easier to find each other, run fair competitions and deliver results. Every organisation that joins makes the network more useful for the others.",
    points: [
      "Suppliers see the tenders that match their CPV codes and regions, and are invited directly by buyers",
      "Buyers reach a reviewed supplier base and invite matching suppliers with one click",
      "Both sides keep questions, documents and decisions in one place instead of in inboxes",
    ],
  },
  features: {
    eyebrow: "Platform capabilities",
    title: "Everything a procurement needs, in one system",
    more: "See all features",
    items: [
      {
        title: "Supplier qualification",
        description:
          "Suppliers complete one profile: company details, CPV codes, regions, nine qualification answers with certificates, insurance and references. PrequaliQ reviews and approves it, and the supplier re-qualifies every year.",
      },
      {
        title: "Searchable supplier database",
        description:
          "Buyers find approved suppliers by CPV code, NUTS region and keyword, open their profile, and invite the ones that match a tender.",
      },
      {
        title: "Procedures for every route",
        description:
          "Open, restricted, negotiated, direct award, framework agreement and dynamic purchasing (DIS). Each procedure gets its own reference number and moves through plan, documentation, Q&A, evaluation and award.",
      },
      {
        title: "Sealed bids",
        description:
          "Suppliers answer the buyer's questions and attach documents. The buyer sees only how many bids have arrived until the deadline has passed and the bids are unsealed.",
      },
      {
        title: "Private Q&A with each supplier",
        description:
          "Every supplier has its own chat with the buyer during the tender. One supplier never sees another supplier's questions.",
      },
      {
        title: "Evaluation and award",
        description:
          "Read all answers and attachments side by side, score each bid from 0 to 100 with notes, ask for a complement, and record the award decision with its standstill period.",
      },
      {
        title: "Contracts and delivery",
        description:
          "An award creates the contract. Buyer and supplier exchange messages and files on it, the supplier reports work as done, and the buyer accepts it or asks for changes.",
      },
      {
        title: "Built-in AI assistance",
        description:
          "AI drafts questionnaires, announcements, replies, evaluation summaries and award memos for buyers, and fills profiles and suggests answers for suppliers. Nothing is saved until a person approves it.",
      },
      {
        title: "A Home screen that shows what is waiting",
        description:
          "Each user opens on a list of what needs attention today, the work in progress and the next deadlines. Email and in-app notices carry the same facts.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "A procurement in eight steps",
    description:
      "The same steps on both sides of the tender. Each one is recorded with who did it and when.",
    steps: [
      {
        title: "Qualify",
        body: "The supplier fills in its profile and submits it. PrequaliQ reviews and approves the account. Buyers are approved the same way.",
      },
      {
        title: "Prepare",
        body: "The buyer writes the questions suppliers must answer, by hand or from an AI draft, and marks which answers need a document.",
      },
      {
        title: "Publish",
        body: "The buyer sets the question deadline and the bid deadline, invites matching suppliers and publishes. Invited suppliers get an email and a notice.",
      },
      {
        title: "Questions",
        body: "Suppliers ask in a private chat. The buyer answers each supplier in its own thread until the question deadline.",
      },
      {
        title: "Bid",
        body: "The supplier submits its declaration, its answers and its documents, and receives a receipt. The bid is locked and sealed.",
      },
      {
        title: "Evaluate",
        body: "After the deadline the buyer unseals the bids, reads the answers and attachments, scores each bid and can ask a supplier for a complement.",
      },
      {
        title: "Award",
        body: "The buyer records the decision and the standstill period. Every bidder is told the outcome, and a contract is created for the winner.",
      },
      {
        title: "Deliver",
        body: "Buyer and supplier work on the contract together: messages, files, work reported as done, accepted or sent back for changes.",
      },
    ],
  },
  ai: {
    eyebrow: "AI assistance",
    title: "AI that drafts, while people decide",
    description:
      "AI is built into the steps where writing takes the most time. It answers in the language the user works in, English or Swedish.",
    items: [
      {
        title: "Questionnaire from a description",
        description:
          "Describe what you want to buy in a few sentences. AI proposes a title, a description, matching CPV codes and up to 15 qualification questions to pick from.",
      },
      {
        title: "Profile from documents",
        description:
          "Upload a registration certificate, an insurance certificate or an ISO certificate. AI reads the PDF and proposes the profile fields, shown beside the current values.",
      },
      {
        title: "Answer suggestions",
        description:
          "For a supplier, AI proposes answers to a buyer's questions from the supplier's own profile and documents, and says when the profile does not hold enough to answer.",
      },
      {
        title: "Replies to supplier questions",
        description:
          "For a buyer, AI drafts a reply to a supplier's question from the procurement's own text. The buyer edits and sends it.",
      },
      {
        title: "Evaluation summary and award memo",
        description:
          "AI summarises the unsealed bids and proposes scores with reasons, then drafts the award memo from the scores the buyer saved.",
      },
      {
        title: "Announcement text",
        description:
          "AI drafts the public announcement from the procedure's title, type and deadlines.",
      },
    ],
    note: "Every AI result is a suggestion. Nothing is saved or sent until a person reviews and applies it. Each AI function can be switched off per user and for the whole platform.",
  },
  trust: {
    eyebrow: "Control and security",
    title: "Built for fair competition",
    items: [
      {
        title: "Bids sealed until the deadline",
        description:
          "Before the deadline the buyer cannot open bids, score them, award, or move the deadline to a date that has passed.",
      },
      {
        title: "Each supplier sees only its own",
        description:
          "Questions, bids, complements, attachments and contracts are visible only to the buyer and the supplier they belong to. Every file is checked before it is served.",
      },
      {
        title: "Reviewed accounts",
        description:
          "Buyers and suppliers are approved before they can publish or bid. A change to important data, such as CPV codes or registration details, sends the account back for review.",
      },
      {
        title: "Decisions that cannot be rewritten",
        description:
          "Reference numbers are issued by the system. Submitted bids, scores after award and the award itself are locked. A contract can only be ended with a written reason.",
      },
    ],
  },
  audiences: {
    eyebrow: "Who it is for",
    title: "Two sides of public procurement, one connected platform",
    buyers: {
      title: "For public buyers",
      subtitle: "Municipalities, regions and contracting authorities",
      description:
        "Run the whole procurement in one place: prepare the questions, publish, answer suppliers, evaluate sealed bids, award and follow up the contract.",
      cta: "Explore for buyers",
      href: "/buyers",
    },
    suppliers: {
      title: "For suppliers",
      subtitle: "Businesses selling to the public sector",
      description:
        "Qualify once, see the tenders that match your business, bid with help from your own profile, and work with the buyer on the contract after award.",
      cta: "Explore for suppliers",
      href: "/suppliers",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        q: "What is Prequaliq?",
        a: "Prequaliq is an AI-assisted e-procurement system for Swedish authorities, municipalities and regions, and for the suppliers that sell to them. It covers supplier qualification, tendering with sealed bids, private Q&A, evaluation, award and contract follow-up on one platform.",
      },
      {
        q: "Who can use the platform?",
        a: "Contracting authorities (public buyers) and suppliers that want to take part in Swedish public procurement. Each side has its own workspace. Both are reviewed and approved by PrequaliQ before they can publish or bid.",
      },
      {
        q: "How does supplier qualification work?",
        a: "A supplier creates a free account and completes one profile: company details, CPV codes and regions, nine qualification answers with supporting documents, insurance and references. PrequaliQ reviews it and approves or returns it with a reason. Approved suppliers can download a qualification certificate, and the qualification is renewed every year.",
      },
      {
        q: "Can a buyer see bids before the deadline?",
        a: "No. Until the bid deadline has passed the buyer sees only the number of bids received. Answers, attachments, scoring and award all open after the bids are unsealed.",
      },
      {
        q: "Can other suppliers see my questions or my bid?",
        a: "No. Questions go to the buyer in a private chat for your company only, and your bid, attachments, complements and contract are visible only to you and the buyer.",
      },
      {
        q: "What does the AI do, and who is in control?",
        a: "AI drafts questionnaires, announcements, replies, evaluation summaries and award memos for buyers, and proposes profile fields and answers for suppliers. Every result is a suggestion that a person reviews before it is saved or sent. AI functions can be switched off per user and for the whole platform.",
      },
      {
        q: "Which procurement procedures are supported?",
        a: "Open, restricted, negotiated, direct award, framework agreement and dynamic purchasing systems (DIS). Call-offs can be registered under a framework contract.",
      },
      {
        q: "What happens after the award?",
        a: "The award creates a contract for the winner. Buyer and supplier exchange messages and documents on it, the supplier reports work as done, and the buyer accepts it or asks for changes. The buyer can end a contract with a written reason that the supplier sees.",
      },
      {
        q: "Which languages are supported?",
        a: "English and Swedish. Each user chooses a language, and AI answers follow it.",
      },
      {
        q: "How do we get started?",
        a: "Suppliers create a free account and start on their profile straight away. Buyers contact our team for a walkthrough and an account.",
      },
    ],
  },
  cta: {
    title: "Ready to run your procurements, or win public contracts, in one place?",
    description:
      "Tell us whether you are a buyer or a supplier. We will show how Prequaliq fits your process.",
    button: "Contact sales",
  },
  buyersPage: {
    breadcrumb: "Buyers",
    title: "Run the whole procurement in one platform",
    description:
      "From the first question you write to the last delivery you accept: prepare, publish, answer suppliers, evaluate sealed bids, award and follow up the contract.",
    sections: [
      {
        title: "See what needs you today",
        body: "Your Home screen lists supplier questions waiting for an answer, bids ready to unseal, bids left to score, deliveries to accept and contracts about to end, with the next deadlines beside them.",
      },
      {
        title: "Prepare the questions once, with AI if you want",
        body: "Write the questions suppliers must answer, choose the answer type and mark which need a document. Or describe the procurement and let AI propose the questions and CPV codes for you to pick from.",
      },
      {
        title: "Publish to the right suppliers",
        body: "Create the procedure, set the question and bid deadlines, and invite approved suppliers whose CPV codes match. Search the supplier database by CPV, region and keyword when you need more.",
      },
      {
        title: "Answer questions in private, keep bids sealed",
        body: "Each supplier asks in its own chat, and AI can draft your reply. Bids arrive sealed: you see the count, nothing more, until the deadline has passed.",
      },
      {
        title: "Evaluate and award on the record",
        body: "Open every answer and attachment in one view, score each bid with notes, request a complement, and record the award with its standstill period. AI can summarise the bids and draft the award memo.",
      },
      {
        title: "Follow the contract to the end",
        body: "The award creates the contract. Exchange messages and files with the supplier, accept delivered work or ask for changes, register call-offs, and end a contract with a written reason when you need to.",
      },
    ],
  },
  suppliersPage: {
    breadcrumb: "Suppliers",
    title: "Qualify once, then bid on the tenders that fit",
    description:
      "One reviewed profile makes you visible to Swedish public buyers. See matching tenders, ask questions in private, submit sealed bids and work with the buyer on the contract.",
    sections: [
      {
        title: "Build one profile, with help from your documents",
        body: "Add company details, CPV codes, regions, nine qualification answers, certificates, insurance and references. Upload your registration, insurance or ISO certificate and AI proposes the fields for you to check.",
      },
      {
        title: "Get approved and stay current",
        body: "Submit the profile when it is complete. PrequaliQ approves it or returns it with a reason. You can download a qualification certificate, you are reminded before documents expire, and you re-qualify once a year.",
      },
      {
        title: "See what needs you today",
        body: "Your Home screen shows open tenders, the bids you have started and submitted, requests from buyers and the next deadlines.",
      },
      {
        title: "Ask in private, bid with confidence",
        body: "Follow the tenders that interest you and ask the buyer in a chat only your company sees. AI can suggest answers from your own profile, and you decide what to keep.",
      },
      {
        title: "Submit a sealed bid and get a receipt",
        body: "Answer the questions, attach the requested documents and submit. The bid is locked, you receive a receipt by email, and the buyer cannot open it before the deadline.",
      },
      {
        title: "Win, then deliver on one contract page",
        body: "You are told the outcome of every tender you bid on. When you win, the contract appears with a message thread for the buyer, and you report the work as done there.",
      },
    ],
  },
  platformPage: {
    breadcrumb: "Platform",
    title: "Everything in Prequaliq",
    description:
      "The full list of what buyers, suppliers and administrators can do, the steps of a procurement, and what the AI helps with.",
    groupsEyebrow: "Features by role",
    groupsTitle: "What each side can do",
    groups: [
      {
        title: "For buyers",
        subtitle: "Contracting authorities",
        items: [
          "Home screen with what needs attention and upcoming dates",
          "Questionnaires with nine answer types and required documents",
          "Attach your own documents to a question",
          "Open, restricted, negotiated, direct, framework and DIS procedures",
          "Automatic reference numbers",
          "Invite suppliers that match the CPV code",
          "Search approved suppliers by CPV, region and keyword",
          "Private Q&A with each supplier",
          "Sealed bids with the ESPD declaration",
          "All answers and attachments in one view",
          "Scoring from 0 to 100 with notes",
          "Complement requests with a reply deadline",
          "Award decision with standstill period",
          "Contracts, call-offs, messages and files",
          "Accept delivered work or ask for changes",
          "End a contract with a written reason",
        ],
      },
      {
        title: "For suppliers",
        subtitle: "Businesses selling to the public sector",
        items: [
          "Free account",
          "Home screen with tenders, bids, requests and deadlines",
          "One profile: company, CPV codes, regions, qualification answers",
          "Certificates, insurance and references with expiry dates",
          "Profile completeness check before submitting",
          "Qualification certificate to print or download",
          "Yearly re-qualification and expiry reminders",
          "Open tenders and direct invitations",
          "Follow tenders you are interested in",
          "Private chat with the buyer",
          "ESPD declaration per tender",
          "Save a bid as a draft, then submit it sealed",
          "Email receipt for every submitted bid",
          "Reply to complement requests with documents",
          "Award outcome for every tender you bid on",
          "Contract messages, files and delivery reporting",
        ],
      },
      {
        title: "For the whole platform",
        subtitle: "Shared by every account",
        items: [
          "English and Swedish, chosen per user",
          "In-app notices and emails with the facts and next steps",
          "Status filters and saved searches on lists",
          "Review and approval of buyer and supplier accounts",
          "New review when important account data changes",
          "AI functions that can be switched off per user or for everyone",
          "Access checked on every page and every file",
          "A record of who did what on each procedure",
        ],
      },
    ],
  },
  footer: {
    blurb:
      "Prequaliq brings Swedish public buyers and suppliers together on one AI-assisted platform, from supplier qualification to finished contract.",
    buyersTitle: "Buyers",
    suppliersTitle: "Suppliers",
    companyTitle: "Company",
    legalTitle: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    copyright: "All rights reserved.",
  },
};

export const productSiteSv: ProductSiteMessages = {
  brand: {
    name: "PrequaliQ",
    productName: "Prequaliq",
    tagline: "Offentlig e-upphandling för Sverige",
    description:
      "Prequaliq är den AI-stödda plattformen för offentlig upphandling för svenska myndigheter, kommuner, regioner och leverantörer. Den omfattar leverantörskvalificering, upphandling med förseglade anbud, utvärdering, tilldelning och avtalsuppföljning i ett system.",
  },
  nav: {
    buyers: "Upphandlare",
    suppliers: "Leverantörer",
    platform: "Plattform",
    about: "Om oss",
    blog: "Insikter",
    careers: "Karriär",
    contact: "Kontakt",
    contactSales: "Kontakta sälj",
    login: "Logga in",
  },
  hero: {
    eyebrow: "Svensk offentlig upphandling",
    title: "Sveriges AI-stödda plattform för offentlig upphandling",
    description:
      "Prequaliq samlar upphandlare och kvalificerade leverantörer i ett system. Upphandlare planerar, publicerar, utvärderar och tilldelar. Leverantörer kvalificerar sig en gång, lämnar anbud på de upphandlingar som passar och levererar enligt avtal. Varje steg dokumenteras, och AI hjälper till med skrivandet.",
    ctaBuyer: "Jag är upphandlare",
    ctaSupplier: "Skapa gratis leverantörskonto",
  },
  preferred: {
    eyebrow: "En plattform",
    title: "Ett system från leverantörskvalificering till avslutat avtal",
    description:
      "Prequaliq ersätter blandningen av portaler, kalkylblad och mejltrådar. Kvalificering, upphandling, frågor, anbud, utvärdering, tilldelning och avtalsuppföljning delar samma underlag, på svenska och engelska.",
    stats: [
      { value: "Hela vägen", label: "Planera, publicera, utvärdera, tilldela och följ upp avtalet i ett flöde" },
      { value: "Kvalificerade", label: "Leverantörer granskas en gång, godkänns och omkvalificeras varje år" },
      { value: "Förseglade", label: "Anbuden är stängda för upphandlaren tills anbudstiden har gått ut" },
    ],
  },
  network: {
    eyebrow: "Upphandlingsnätverk",
    title: "Ett starkare sätt att koppla ihop upphandlare och leverantörer i Sverige",
    description:
      "Prequaliq kopplar samman upphandlande myndigheter och leverantörer på en plattform, så att det blir lättare att hitta varandra, genomföra rättvisa konkurrenser och leverera resultat. Varje organisation som ansluter gör nätverket mer användbart för de andra.",
    points: [
      "Leverantörer ser de upphandlingar som matchar deras CPV-koder och regioner, och bjuds in direkt av upphandlare",
      "Upphandlare når en granskad leverantörsbas och bjuder in matchande leverantörer med ett klick",
      "Båda sidor håller frågor, dokument och beslut på ett ställe i stället för i inkorgar",
    ],
  },
  features: {
    eyebrow: "Plattformens funktioner",
    title: "Allt en upphandling behöver, i ett system",
    more: "Se alla funktioner",
    items: [
      {
        title: "Leverantörskvalificering",
        description:
          "Leverantören fyller i en profil: företagsuppgifter, CPV-koder, regioner, nio kvalificeringssvar med certifikat, försäkring och referenser. PrequaliQ granskar och godkänner den, och leverantören omkvalificeras varje år.",
      },
      {
        title: "Sökbar leverantörsdatabas",
        description:
          "Upphandlare hittar godkända leverantörer på CPV-kod, NUTS-region och sökord, öppnar deras profil och bjuder in dem som passar en upphandling.",
      },
      {
        title: "Förfaranden för varje väg",
        description:
          "Öppet, selektivt, förhandlat, direktupphandling, ramavtal och dynamiskt inköpssystem (DIS). Varje upphandling får ett eget referensnummer och går genom plan, underlag, frågor och svar, utvärdering och tilldelning.",
      },
      {
        title: "Förseglade anbud",
        description:
          "Leverantörer svarar på upphandlarens frågor och bifogar dokument. Upphandlaren ser bara hur många anbud som kommit in tills anbudstiden har gått ut och anbuden öppnas.",
      },
      {
        title: "Privata frågor och svar med varje leverantör",
        description:
          "Varje leverantör har en egen chatt med upphandlaren under upphandlingen. En leverantör ser aldrig en annan leverantörs frågor.",
      },
      {
        title: "Utvärdering och tilldelning",
        description:
          "Läs alla svar och bilagor sida vid sida, poängsätt varje anbud från 0 till 100 med anteckningar, begär komplettering och dokumentera tilldelningsbeslutet med avtalsspärr.",
      },
      {
        title: "Avtal och leverans",
        description:
          "Tilldelningen skapar avtalet. Upphandlare och leverantör utbyter meddelanden och filer på det, leverantören rapporterar arbetet som klart och upphandlaren godkänner eller begär ändringar.",
      },
      {
        title: "Inbyggt AI-stöd",
        description:
          "AI tar fram utkast till frågeformulär, annonser, svar, utvärderingssammanfattningar och tilldelningsbeslut för upphandlare, och fyller i profiler och föreslår svar för leverantörer. Inget sparas förrän en människa har godkänt det.",
      },
      {
        title: "En startsida som visar vad som väntar",
        description:
          "Varje användare möts av en lista över vad som behöver uppmärksamhet idag, pågående arbete och nästa tidsfrister. Mejl och aviseringar i appen innehåller samma fakta.",
      },
    ],
  },
  process: {
    eyebrow: "Så fungerar det",
    title: "En upphandling i åtta steg",
    description:
      "Samma steg på båda sidor av upphandlingen. Varje steg dokumenteras med vem som gjorde det och när.",
    steps: [
      {
        title: "Kvalificera",
        body: "Leverantören fyller i sin profil och skickar in den. PrequaliQ granskar och godkänner kontot. Upphandlare godkänns på samma sätt.",
      },
      {
        title: "Förbered",
        body: "Upphandlaren skriver frågorna som leverantörerna ska besvara, för hand eller från ett AI-utkast, och markerar vilka svar som kräver ett dokument.",
      },
      {
        title: "Publicera",
        body: "Upphandlaren anger sista dag för frågor och sista anbudsdag, bjuder in matchande leverantörer och publicerar. Inbjudna leverantörer får mejl och avisering.",
      },
      {
        title: "Frågor",
        body: "Leverantörer ställer frågor i en privat chatt. Upphandlaren svarar varje leverantör i dess egen tråd fram till sista dag för frågor.",
      },
      {
        title: "Anbud",
        body: "Leverantören lämnar sin egenförsäkran, sina svar och sina dokument och får ett kvitto. Anbudet är låst och förseglat.",
      },
      {
        title: "Utvärdera",
        body: "Efter anbudstidens utgång öppnar upphandlaren anbuden, läser svar och bilagor, poängsätter varje anbud och kan begära komplettering av en leverantör.",
      },
      {
        title: "Tilldela",
        body: "Upphandlaren dokumenterar beslutet och avtalsspärren. Varje anbudsgivare får besked om utfallet, och ett avtal skapas för vinnaren.",
      },
      {
        title: "Leverera",
        body: "Upphandlare och leverantör arbetar tillsammans i avtalet: meddelanden, filer, arbete som rapporteras klart, godkänns eller skickas tillbaka för ändring.",
      },
    ],
  },
  ai: {
    eyebrow: "AI-stöd",
    title: "AI som skriver utkast, medan människor beslutar",
    description:
      "AI finns inbyggt i de steg där skrivandet tar mest tid. Det svarar på det språk användaren arbetar på, svenska eller engelska.",
    items: [
      {
        title: "Frågeformulär från en beskrivning",
        description:
          "Beskriv vad ni vill upphandla med några meningar. AI föreslår titel, beskrivning, matchande CPV-koder och upp till 15 kvalificeringsfrågor att välja bland.",
      },
      {
        title: "Profil från dokument",
        description:
          "Ladda upp ett registreringsbevis, ett försäkringsbevis eller ett ISO-certifikat. AI läser PDF-filen och föreslår profilfälten, som visas bredvid de nuvarande värdena.",
      },
      {
        title: "Svarsförslag",
        description:
          "För en leverantör föreslår AI svar på upphandlarens frågor utifrån leverantörens egen profil och dokument, och säger till när profilen inte räcker för ett svar.",
      },
      {
        title: "Svar på leverantörsfrågor",
        description:
          "För en upphandlare skriver AI ett utkast till svar på en leverantörs fråga utifrån upphandlingens egen text. Upphandlaren redigerar och skickar.",
      },
      {
        title: "Utvärderingssammanfattning och tilldelningsbeslut",
        description:
          "AI sammanfattar de öppnade anbuden och föreslår poäng med motivering, och skriver sedan ett utkast till tilldelningsbeslut utifrån de poäng upphandlaren har sparat.",
      },
      {
        title: "Annonstext",
        description:
          "AI skriver ett utkast till den offentliga annonsen utifrån upphandlingens titel, typ och tidsfrister.",
      },
    ],
    note: "Varje AI-resultat är ett förslag. Inget sparas eller skickas förrän en människa har granskat och godkänt det. Varje AI-funktion kan stängas av per användare och för hela plattformen.",
  },
  trust: {
    eyebrow: "Kontroll och säkerhet",
    title: "Byggd för rättvis konkurrens",
    items: [
      {
        title: "Anbuden förseglade till anbudstidens utgång",
        description:
          "Före anbudstidens utgång kan upphandlaren inte öppna anbud, poängsätta dem, tilldela eller flytta sista anbudsdag till ett datum som har passerat.",
      },
      {
        title: "Varje leverantör ser bara sitt eget",
        description:
          "Frågor, anbud, kompletteringar, bilagor och avtal syns bara för upphandlaren och den leverantör de tillhör. Varje fil kontrolleras innan den lämnas ut.",
      },
      {
        title: "Granskade konton",
        description:
          "Upphandlare och leverantörer godkänns innan de kan publicera eller lämna anbud. En ändring av viktiga uppgifter, som CPV-koder eller registreringsuppgifter, skickar kontot till ny granskning.",
      },
      {
        title: "Beslut som inte kan skrivas om",
        description:
          "Referensnummer utfärdas av systemet. Inlämnade anbud, poäng efter tilldelning och själva tilldelningen är låsta. Ett avtal kan bara avslutas med en skriftlig motivering.",
      },
    ],
  },
  audiences: {
    eyebrow: "Vem det är för",
    title: "Två sidor av offentlig upphandling, en sammankopplad plattform",
    buyers: {
      title: "För upphandlare",
      subtitle: "Kommuner, regioner och upphandlande myndigheter",
      description:
        "Genomför hela upphandlingen på ett ställe: förbered frågorna, publicera, svara leverantörer, utvärdera förseglade anbud, tilldela och följ upp avtalet.",
      cta: "Utforska för upphandlare",
      href: "/buyers",
    },
    suppliers: {
      title: "För leverantörer",
      subtitle: "Företag som säljer till offentlig sektor",
      description:
        "Kvalificera er en gång, se de upphandlingar som passar er verksamhet, lämna anbud med stöd av er egen profil och arbeta med upphandlaren i avtalet efter tilldelning.",
      cta: "Utforska för leverantörer",
      href: "/suppliers",
    },
  },
  faq: {
    eyebrow: "Vanliga frågor",
    title: "Vanliga frågor",
    items: [
      {
        q: "Vad är Prequaliq?",
        a: "Prequaliq är ett AI-stött e-upphandlingssystem för svenska myndigheter, kommuner och regioner, och för de leverantörer som säljer till dem. Det omfattar leverantörskvalificering, upphandling med förseglade anbud, privata frågor och svar, utvärdering, tilldelning och avtalsuppföljning på en plattform.",
      },
      {
        q: "Vem kan använda plattformen?",
        a: "Upphandlande myndigheter och leverantörer som vill delta i svensk offentlig upphandling. Varje sida har sin egen arbetsyta. Båda granskas och godkänns av PrequaliQ innan de kan publicera eller lämna anbud.",
      },
      {
        q: "Hur fungerar leverantörskvalificeringen?",
        a: "Leverantören skapar ett gratis konto och fyller i en profil: företagsuppgifter, CPV-koder och regioner, nio kvalificeringssvar med styrkande dokument, försäkring och referenser. PrequaliQ granskar den och godkänner eller återlämnar den med en motivering. Godkända leverantörer kan ladda ner ett kvalificeringsintyg, och kvalificeringen förnyas varje år.",
      },
      {
        q: "Kan en upphandlare se anbuden före anbudstidens utgång?",
        a: "Nej. Tills anbudstiden har gått ut ser upphandlaren bara antalet inkomna anbud. Svar, bilagor, poängsättning och tilldelning öppnas först när anbuden har öppnats.",
      },
      {
        q: "Kan andra leverantörer se mina frågor eller mitt anbud?",
        a: "Nej. Frågor går till upphandlaren i en privat chatt som bara gäller ert företag, och ert anbud, era bilagor, kompletteringar och avtal syns bara för er och upphandlaren.",
      },
      {
        q: "Vad gör AI:n, och vem har kontrollen?",
        a: "AI tar fram utkast till frågeformulär, annonser, svar, utvärderingssammanfattningar och tilldelningsbeslut för upphandlare, och föreslår profilfält och svar för leverantörer. Varje resultat är ett förslag som en människa granskar innan det sparas eller skickas. AI-funktionerna kan stängas av per användare och för hela plattformen.",
      },
      {
        q: "Vilka upphandlingsförfaranden stöds?",
        a: "Öppet, selektivt, förhandlat, direktupphandling, ramavtal och dynamiska inköpssystem (DIS). Avrop kan registreras under ett ramavtal.",
      },
      {
        q: "Vad händer efter tilldelningen?",
        a: "Tilldelningen skapar ett avtal för vinnaren. Upphandlare och leverantör utbyter meddelanden och dokument i avtalet, leverantören rapporterar arbetet som klart och upphandlaren godkänner eller begär ändringar. Upphandlaren kan avsluta ett avtal med en skriftlig motivering som leverantören ser.",
      },
      {
        q: "Vilka språk stöds?",
        a: "Svenska och engelska. Varje användare väljer språk, och AI-svaren följer det.",
      },
      {
        q: "Hur kommer vi igång?",
        a: "Leverantörer skapar ett gratis konto och börjar med sin profil direkt. Upphandlare kontaktar vårt team för en genomgång och ett konto.",
      },
    ],
  },
  cta: {
    title: "Redo att genomföra era upphandlingar, eller vinna offentliga kontrakt, på ett ställe?",
    description:
      "Berätta om ni är upphandlare eller leverantör. Vi visar hur Prequaliq passar er process.",
    button: "Kontakta sälj",
  },
  buyersPage: {
    breadcrumb: "Upphandlare",
    title: "Genomför hela upphandlingen i en plattform",
    description:
      "Från den första frågan ni skriver till den sista leveransen ni godkänner: förbered, publicera, svara leverantörer, utvärdera förseglade anbud, tilldela och följ upp avtalet.",
    sections: [
      {
        title: "Se vad som behöver er idag",
        body: "Startsidan visar leverantörsfrågor som väntar på svar, anbud som kan öppnas, anbud kvar att poängsätta, leveranser att godkänna och avtal som snart löper ut, med nästa tidsfrister bredvid.",
      },
      {
        title: "Förbered frågorna en gång, med AI om ni vill",
        body: "Skriv frågorna som leverantörerna ska besvara, välj svarstyp och markera vilka som kräver ett dokument. Eller beskriv upphandlingen och låt AI föreslå frågor och CPV-koder att välja bland.",
      },
      {
        title: "Publicera till rätt leverantörer",
        body: "Skapa upphandlingen, ange sista dag för frågor och sista anbudsdag, och bjud in godkända leverantörer vars CPV-koder matchar. Sök i leverantörsdatabasen på CPV, region och sökord när ni behöver fler.",
      },
      {
        title: "Svara på frågor privat, håll anbuden förseglade",
        body: "Varje leverantör frågar i sin egen chatt, och AI kan skriva ett utkast till ert svar. Anbuden kommer in förseglade: ni ser antalet, inget mer, tills anbudstiden har gått ut.",
      },
      {
        title: "Utvärdera och tilldela med full dokumentation",
        body: "Öppna varje svar och bilaga i en vy, poängsätt varje anbud med anteckningar, begär komplettering och dokumentera tilldelningen med avtalsspärr. AI kan sammanfatta anbuden och skriva ett utkast till tilldelningsbeslut.",
      },
      {
        title: "Följ avtalet till slutet",
        body: "Tilldelningen skapar avtalet. Utbyt meddelanden och filer med leverantören, godkänn levererat arbete eller begär ändringar, registrera avrop och avsluta ett avtal med skriftlig motivering när det behövs.",
      },
    ],
  },
  suppliersPage: {
    breadcrumb: "Leverantörer",
    title: "Kvalificera er en gång, lämna sedan anbud där det passar",
    description:
      "En granskad profil gör er synliga för svenska upphandlare. Se matchande upphandlingar, ställ frågor privat, lämna förseglade anbud och arbeta med upphandlaren i avtalet.",
    sections: [
      {
        title: "Bygg en profil, med hjälp av era dokument",
        body: "Lägg in företagsuppgifter, CPV-koder, regioner, nio kvalificeringssvar, certifikat, försäkring och referenser. Ladda upp ert registreringsbevis, försäkringsbevis eller ISO-certifikat så föreslår AI fälten för er att kontrollera.",
      },
      {
        title: "Bli godkänd och håll er aktuella",
        body: "Skicka in profilen när den är komplett. PrequaliQ godkänner den eller återlämnar den med en motivering. Ni kan ladda ner ett kvalificeringsintyg, ni påminns innan dokument går ut och ni omkvalificeras en gång om året.",
      },
      {
        title: "Se vad som behöver er idag",
        body: "Startsidan visar öppna upphandlingar, de anbud ni har påbörjat och lämnat in, förfrågningar från upphandlare och nästa tidsfrister.",
      },
      {
        title: "Fråga privat, lämna anbud med trygghet",
        body: "Följ de upphandlingar som intresserar er och fråga upphandlaren i en chatt som bara ert företag ser. AI kan föreslå svar utifrån er egen profil, och ni bestämmer vad som ska behållas.",
      },
      {
        title: "Lämna ett förseglat anbud och få ett kvitto",
        body: "Besvara frågorna, bifoga de begärda dokumenten och lämna in. Anbudet är låst, ni får ett kvitto via mejl och upphandlaren kan inte öppna det före anbudstidens utgång.",
      },
      {
        title: "Vinn, och leverera sedan på en avtalssida",
        body: "Ni får besked om utfallet i varje upphandling ni lämnat anbud i. När ni vinner visas avtalet med en meddelandetråd till upphandlaren, och där rapporterar ni arbetet som klart.",
      },
    ],
  },
  platformPage: {
    breadcrumb: "Plattform",
    title: "Allt i Prequaliq",
    description:
      "Hela listan över vad upphandlare, leverantörer och administratörer kan göra, stegen i en upphandling och vad AI hjälper till med.",
    groupsEyebrow: "Funktioner per roll",
    groupsTitle: "Vad varje sida kan göra",
    groups: [
      {
        title: "För upphandlare",
        subtitle: "Upphandlande myndigheter",
        items: [
          "Startsida med vad som behöver uppmärksamhet och kommande datum",
          "Frågeformulär med nio svarstyper och obligatoriska dokument",
          "Bifoga egna dokument till en fråga",
          "Öppet, selektivt, förhandlat, direkt, ramavtal och DIS",
          "Automatiska referensnummer",
          "Bjud in leverantörer som matchar CPV-koden",
          "Sök godkända leverantörer på CPV, region och sökord",
          "Privata frågor och svar med varje leverantör",
          "Förseglade anbud med ESPD-egenförsäkran",
          "Alla svar och bilagor i en vy",
          "Poängsättning från 0 till 100 med anteckningar",
          "Begäran om komplettering med svarsfrist",
          "Tilldelningsbeslut med avtalsspärr",
          "Avtal, avrop, meddelanden och filer",
          "Godkänn levererat arbete eller begär ändringar",
          "Avsluta ett avtal med skriftlig motivering",
        ],
      },
      {
        title: "För leverantörer",
        subtitle: "Företag som säljer till offentlig sektor",
        items: [
          "Gratis konto",
          "Startsida med upphandlingar, anbud, förfrågningar och tidsfrister",
          "En profil: företag, CPV-koder, regioner, kvalificeringssvar",
          "Certifikat, försäkring och referenser med giltighetsdatum",
          "Kontroll av att profilen är komplett före inlämning",
          "Kvalificeringsintyg att skriva ut eller ladda ner",
          "Årlig omkvalificering och påminnelser om utgående dokument",
          "Öppna upphandlingar och direkta inbjudningar",
          "Följ upphandlingar ni är intresserade av",
          "Privat chatt med upphandlaren",
          "ESPD-egenförsäkran per upphandling",
          "Spara ett anbud som utkast, lämna sedan in det förseglat",
          "Kvitto via mejl för varje inlämnat anbud",
          "Svara på kompletteringsbegäran med dokument",
          "Besked om utfallet i varje upphandling ni lämnat anbud i",
          "Meddelanden, filer och leveransrapportering i avtalet",
        ],
      },
      {
        title: "För hela plattformen",
        subtitle: "Gemensamt för alla konton",
        items: [
          "Svenska och engelska, valt per användare",
          "Aviseringar i appen och mejl med fakta och nästa steg",
          "Statusfilter och sparade sökningar i listor",
          "Granskning och godkännande av upphandlar- och leverantörskonton",
          "Ny granskning när viktiga kontouppgifter ändras",
          "AI-funktioner som kan stängas av per användare eller för alla",
          "Behörighet kontrolleras på varje sida och varje fil",
          "Logg över vem som gjorde vad i varje upphandling",
        ],
      },
    ],
  },
  footer: {
    blurb:
      "Prequaliq samlar svenska upphandlare och leverantörer på en AI-stödd plattform, från leverantörskvalificering till avslutat avtal.",
    buyersTitle: "Upphandlare",
    suppliersTitle: "Leverantörer",
    companyTitle: "Företag",
    legalTitle: "Juridiskt",
    privacy: "Integritetspolicy",
    terms: "Villkor",
    copyright: "Alla rättigheter förbehållna.",
  },
};

export function getProductSite(locale: Locale): ProductSiteMessages {
  return locale === "sv" ? productSiteSv : productSiteEn;
}
