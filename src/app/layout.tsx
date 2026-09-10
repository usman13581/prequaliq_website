import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getLocale } from "@/i18n/server";
import { getMessages } from "@/i18n";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const themeInitScript = `(function(){try{var t=localStorage.getItem('prequaliq-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

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
    <html
      lang={locale}
      className={`${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider initialLocale={locale}>
            <SiteChrome>{children}</SiteChrome>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
