"use client";

import { localeLabels, type Locale } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";

const localeButtonClass = (active: boolean, variant: "dark" | "light") => {
  if (variant === "dark") {
    return active
      ? "bg-white text-primary"
      : "text-white/70 hover:text-white hover:bg-white/10";
  }
  return active
    ? "bg-primary text-white"
    : "text-muted hover:text-primary hover:bg-surface";
};

function LocaleButtons({ variant }: { variant: "dark" | "light" }) {
  const { locale, setLocale } = useLanguage();

  return (
    <>
      {(["en", "sv"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`shrink-0 min-h-10 min-w-[2.75rem] px-2.5 py-2 text-xs font-bold transition-colors ${localeButtonClass(locale === code, variant)}`}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </>
  );
}

export function LanguageToggle() {
  return (
    <div
      className="inline-flex shrink-0 items-center rounded-lg border border-white/15"
      role="group"
      aria-label="Language"
    >
      <LocaleButtons variant="dark" />
    </div>
  );
}

export function LanguageToggleLight() {
  return (
    <div
      className="inline-flex shrink-0 items-center rounded-lg border border-border bg-card"
      role="group"
      aria-label="Language"
    >
      <LocaleButtons variant="light" />
    </div>
  );
}
