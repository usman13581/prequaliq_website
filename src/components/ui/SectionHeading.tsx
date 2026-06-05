type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-14 ${alignClass} ${className}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 mb-4 ${align === "center" ? "justify-center w-full" : ""}`}
        >
          <span className="h-px w-8 bg-accent" />
          <p
            className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-blue-300" : "text-accent"}`}
          >
            {eyebrow}
          </p>
          {align === "center" && <span className="h-px w-8 bg-accent" />}
        </div>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight leading-snug mb-5 ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base md:text-lg leading-relaxed max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-slate-300" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
