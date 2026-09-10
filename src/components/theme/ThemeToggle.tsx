"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useTranslations } from "@/i18n/LanguageProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-surface hover:text-accent dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:hover:text-white ${className}`}
      aria-label={isDark ? t.common.themeLight : t.common.themeDark}
      aria-pressed={isDark}
      title={isDark ? t.common.themeLight : t.common.themeDark}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
}
