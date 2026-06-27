"use client";

import { localeLabels, type Locale } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";

type LanguageSwitchProps = {
  variant?: "dark" | "light";
};

export function LanguageToggle({ variant = "dark" }: LanguageSwitchProps) {
  return <LanguageSwitch variant={variant} />;
}

export function LanguageToggleLight() {
  return <LanguageSwitch variant="light" />;
}

function LanguageSwitch({ variant }: LanguageSwitchProps) {
  const { locale, setLocale } = useLanguage();
  const isDark = variant === "dark";

  const setLanguage = (next: Locale) => {
    if (next !== locale) setLocale(next);
  };

  return (
    <div
      className={`relative inline-flex h-10 w-[5.75rem] shrink-0 rounded-full p-1 ${
        isDark
          ? "bg-white/10 border border-white/20"
          : "bg-surface border border-border shadow-sm"
      }`}
      role="group"
      aria-label="Language"
    >
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full transition-transform duration-200 ease-out shadow-sm ${
          isDark ? "bg-white" : "bg-primary"
        } ${locale === "sv" ? "translate-x-[calc(100%+0.125rem)]" : "translate-x-0"}`}
        aria-hidden
      />
      {(["en", "sv"] as Locale[]).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={`relative z-10 flex-1 min-w-0 rounded-full text-xs font-bold transition-colors duration-200 ${
              active
                ? isDark
                  ? "text-primary"
                  : "text-white"
                : isDark
                  ? "text-white/75 hover:text-white"
                  : "text-muted hover:text-foreground"
            }`}
            aria-pressed={active}
            aria-label={code === "en" ? "English" : "Svenska"}
          >
            {localeLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
