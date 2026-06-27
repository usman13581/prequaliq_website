"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-data";

type LogoProps = {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  subtitle?: string;
};

export function Logo({ variant = "default", size = "md", subtitle = "Swedish IT Partner" }: LogoProps) {
  const pathname = usePathname();
  const textColor = variant === "light" ? "text-white" : "text-primary";
  const subColor = variant === "light" ? "text-slate-400" : "text-muted-light";
  const sizes = {
    sm: { img: 32, text: "text-base sm:text-lg" },
    md: { img: 36, text: "text-lg sm:text-xl" },
    lg: { img: 44, text: "text-xl sm:text-2xl" },
  };

  function handleLogoClick() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Link
      href="/"
      onClick={handleLogoClick}
      className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1 lg:flex-none max-w-[calc(100%-3.5rem)] lg:max-w-none"
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={sizes[size].img}
        height={sizes[size].img}
        className="rounded-xl shrink-0"
      />
      <div className="flex flex-col leading-tight min-w-0">
        <span className={`${sizes[size].text} font-bold ${textColor} tracking-tight truncate`}>
          {siteConfig.name}
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-medium normal-case tracking-normal mt-0.5 ${subColor} line-clamp-2 sm:line-clamp-1 sm:truncate`}
        >
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
