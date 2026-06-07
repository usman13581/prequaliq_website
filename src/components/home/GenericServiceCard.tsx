"use client";

"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

type GenericServiceCardProps = {
  title: string;
  shortDescription: string;
  href: string;
  icon: string;
};

const icons: Record<string, ReactNode> = {
  apps: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  cloud: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  ai: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  team: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export function GenericServiceCard({ title, shortDescription, href, icon }: GenericServiceCardProps) {
  const t = useTranslations();

  return (
    <Link
      href={href}
      className="group card-shine relative bg-card rounded-2xl p-7 border border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="h-12 w-12 rounded-2xl bg-accent-subtle text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          {icons[icon] ?? icons.apps}
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-light group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed flex-1">{shortDescription}</p>
      <div className="mt-6 pt-5 border-t border-border">
        <span className="text-sm font-semibold text-accent">{t.common.learnMore} →</span>
      </div>
    </Link>
  );
}
