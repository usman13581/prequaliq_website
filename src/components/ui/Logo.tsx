import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

type LogoProps = {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  subtitle?: string;
};

export function Logo({ variant = "default", size = "md", subtitle = "Swedish IT Partner" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-primary";
  const subColor = variant === "light" ? "text-slate-400" : "text-muted-light";
  const sizes = {
    sm: { img: 32, text: "text-base sm:text-lg" },
    md: { img: 36, text: "text-lg sm:text-xl" },
    lg: { img: 44, text: "text-xl sm:text-2xl" },
  };

  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 max-w-[55%] sm:max-w-none">
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
          className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.18em] mt-0.5 ${subColor} truncate`}
        >
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
