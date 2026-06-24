import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

type LogoProps = {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  /** Hide wordmark on small screens to keep header controls tappable */
  compactOnMobile?: boolean;
};

export function Logo({ variant = "default", size = "md", compactOnMobile = false }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-primary";
  const subColor = variant === "light" ? "text-slate-400" : "text-muted-light";
  const sizes = {
    sm: { img: 32, text: "text-lg" },
    md: { img: 36, text: "text-xl" },
    lg: { img: 44, text: "text-2xl" },
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-2 sm:gap-3 group min-w-0 pointer-events-auto ${
        compactOnMobile ? "max-w-[42vw] sm:max-w-none" : ""
      }`}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={sizes[size].img}
        height={sizes[size].img}
        className="rounded-xl shrink-0"
      />
      <div
        className={`flex flex-col leading-none min-w-0 ${
          compactOnMobile ? "hidden sm:flex" : ""
        }`}
      >
        <span className={`${sizes[size].text} font-bold ${textColor} tracking-tight truncate`}>
          {siteConfig.name}
        </span>
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.2em] mt-0.5 ${subColor} truncate`}
        >
          Enterprise Solutions
        </span>
      </div>
    </Link>
  );
}
