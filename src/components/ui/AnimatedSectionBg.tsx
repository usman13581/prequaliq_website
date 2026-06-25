import Image from "next/image";

type AnimatedSectionBgProps = {
  src: string;
  /** 0–100 — dark overlay strength */
  overlay?: number;
  className?: string;
  animate?: "hero" | "drift" | "none";
};

export function AnimatedSectionBg({
  src,
  overlay = 85,
  className = "",
  animate = "hero",
}: AnimatedSectionBgProps) {
  const animationClass =
    animate === "hero" ? "animate-hero-bg" : animate === "drift" ? "animate-bg-drift" : "";

  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        className={`object-cover pointer-events-none ${animationClass} ${className}`}
        sizes="100vw"
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom right, rgba(11,18,32,${overlay / 100}) 0%, rgba(15,39,68,${(overlay - 10) / 100}) 50%, rgba(37,99,235,${Math.max(0, (overlay - 70) / 100)}) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-accent/20 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
    </>
  );
}
