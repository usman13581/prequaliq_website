import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  icon?: boolean;
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5",
  secondary:
    "bg-primary text-white hover:bg-primary-mid shadow-lg shadow-primary/15 hover:-translate-y-0.5",
  outline:
    "border border-border-strong bg-card text-foreground hover:border-accent hover:text-accent shadow-sm",
  ghost: "text-foreground hover:bg-surface",
  white:
    "bg-white text-primary hover:bg-slate-50 shadow-lg shadow-black/10 hover:-translate-y-0.5",
};

const sizes = {
  sm: "px-4 py-2.5 text-sm gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  onClick,
  icon = false,
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="w-4 h-4" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {content}
    </button>
  );
}
