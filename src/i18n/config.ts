export const locales = ["en", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "prequaliq_locale";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  sv: "SV",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
