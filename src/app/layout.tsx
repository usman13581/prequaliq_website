import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getLocale } from "@/i18n/server";
import { getProductSite } from "@/i18n/product-site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const themeInitScript = `(function(){try{var t=localStorage.getItem('prequaliq-theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getProductSite(locale);

  return {
    title: {
      default: `${t.brand.name} — ${t.brand.tagline}`,
      template: `%s | ${t.brand.name}`,
    },
    description: t.brand.description,
    keywords: [
      "e-procurement",
      "e-upphandling",
      "public procurement",
      "offentlig upphandling",
      "supplier qualification",
      "dynamic purchasing",
      "DIS",
      "PrequaliQ",
      "Prequaliq",
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
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
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
