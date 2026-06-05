type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "accent" | "dark";
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default: "bg-surface text-muted border-border",
    accent: "bg-accent-subtle text-accent border-accent/20",
    dark: "bg-white/10 text-white border-white/20",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
