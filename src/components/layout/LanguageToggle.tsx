"use client";

import { localeLabels, type Locale } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="flex items-center rounded-lg border border-white/15 overflow-hidden text-xs font-bold"
      role="group"
      aria-label="Language"
    >
      {(["en", "sv"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`px-2.5 py-1 transition-colors ${
            locale === code
              ? "bg-white text-primary"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}

export function LanguageToggleLight() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="flex items-center rounded-lg border border-border overflow-hidden text-xs font-bold bg-card"
      role="group"
      aria-label="Language"
    >
      {(["en", "sv"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`px-2.5 py-1 transition-colors ${
            locale === code
              ? "bg-primary text-white"
              : "text-muted hover:text-primary hover:bg-surface"
          }`}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
