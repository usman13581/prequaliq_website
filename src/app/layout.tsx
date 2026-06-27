import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";
import { ProjectModalProvider } from "@/components/project/ProjectModalProvider";
import { getLocale } from "@/i18n/server";
import { getMessages } from "@/i18n";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getMessages(locale);

  return {
    title: {
      default: `${t.site.name} — ${t.site.tagline}`,
      template: `%s | ${t.site.name}`,
    },
    description: t.site.description,
    keywords: [
      "enterprise solutions",
      "web application development",
      "mobile app development",
      "cloud integration",
      "custom software",
      "AI solutions",
      "PrequaliQ",
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider initialLocale={locale}>
          <ContactModalProvider>
            <ProjectModalProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </ProjectModalProvider>
          </ContactModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
