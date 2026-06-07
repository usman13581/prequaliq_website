export type LegalDocumentType = "privacy" | "terms";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalDocument = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export const legalDocuments: Record<LegalDocumentType, LegalDocument> = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "June 2025",
    intro:
      "PrequaliQ (“we”, “us”, “our”) respects your privacy. This policy explains how we collect, use, and protect personal information when you visit our website or contact us about our products and services.",
    sections: [
      {
        title: "Information we collect",
        paragraphs: [
          "We may collect information you provide directly — such as your name, email address, phone number, company name, and message content when you use our contact form or communicate with us by email or phone.",
          "We may also collect technical data automatically when you browse our website, including IP address, browser type, device information, and pages visited, through cookies and similar technologies where applicable.",
        ],
      },
      {
        title: "How we use your information",
        paragraphs: [
          "We use your information to respond to inquiries, provide demos and consultations, deliver our products and services, improve our website, and communicate with you about relevant updates.",
          "We do not sell your personal data to third parties.",
        ],
      },
      {
        title: "Legal basis & retention",
        paragraphs: [
          "We process personal data based on legitimate business interests, contractual necessity, consent where required, and compliance with applicable law.",
          "We retain information only for as long as needed to fulfil the purposes described in this policy or as required by law.",
        ],
      },
      {
        title: "Sharing & security",
        paragraphs: [
          "We may share data with trusted service providers who assist us in operating our website and business, subject to appropriate confidentiality obligations.",
          "We implement reasonable technical and organisational measures to protect personal information against unauthorised access, loss, or misuse.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data, or to object to certain processing activities.",
          "To exercise these rights or ask questions about this policy, contact us at info@prequaliq.com.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "PrequaliQ · Skandiavägen 35, 182 63 Djursholm, Sweden · info@prequaliq.com",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    lastUpdated: "June 2025",
    intro:
      "These Terms & Conditions govern your use of the PrequaliQ website (prequaliq.com). By accessing or using this site, you agree to these terms. If you do not agree, please do not use the website.",
    sections: [
      {
        title: "Use of the website",
        paragraphs: [
          "This website provides general information about PrequaliQ, our products, and services. Content is for informational purposes and does not constitute a binding offer unless agreed separately in writing.",
          "You agree to use the website lawfully and not to attempt to disrupt, damage, or gain unauthorised access to our systems or data.",
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "All content on this website — including text, graphics, logos, and layout — is owned by or licensed to PrequaliQ and protected by applicable intellectual property laws.",
          "You may not copy, reproduce, or distribute website content without our prior written consent.",
        ],
      },
      {
        title: "Products & services",
        paragraphs: [
          "Descriptions of products such as Prequaliq Apps and Enterprise Hub are provided for general guidance. Specific features, timelines, and deliverables are defined in separate agreements between PrequaliQ and the client.",
          "We reserve the right to update product information on this website at any time without prior notice.",
        ],
      },
      {
        title: "Disclaimer",
        paragraphs: [
          "The website is provided “as is”. We make reasonable efforts to keep information accurate and up to date but do not warrant that content is complete, error-free, or continuously available.",
          "To the fullest extent permitted by law, PrequaliQ is not liable for any indirect or consequential loss arising from use of this website.",
        ],
      },
      {
        title: "Third-party links",
        paragraphs: [
          "Our website may contain links to third-party sites (for example, LinkedIn). We are not responsible for the content or privacy practices of external websites.",
        ],
      },
      {
        title: "Governing law & contact",
        paragraphs: [
          "These terms are governed by the laws of Sweden. Any disputes shall be subject to the exclusive jurisdiction of Swedish courts, unless mandatory law provides otherwise.",
          "Questions about these terms: info@prequaliq.com · PrequaliQ, Skandiavägen 35, 182 63 Djursholm, Sweden.",
        ],
      },
    ],
  },
};
