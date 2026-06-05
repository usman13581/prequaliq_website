import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

type LogoProps = {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
};

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-primary";
  const subColor = variant === "light" ? "text-slate-400" : "text-muted-light";
  const sizes = {
    sm: { img: 32, text: "text-lg" },
    md: { img: 36, text: "text-xl" },
    lg: { img: 44, text: "text-2xl" },
  };

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={sizes[size].img}
        height={sizes[size].img}
        className="rounded-xl"
      />
      <div className="flex flex-col leading-none">
        <span className={`${sizes[size].text} font-bold ${textColor} tracking-tight`}>
          {siteConfig.name}
        </span>
        <span className={`text-[10px] font-medium uppercase tracking-[0.2em] mt-0.5 ${subColor}`}>
          Enterprise Solutions
        </span>
      </div>
    </Link>
  );
}
