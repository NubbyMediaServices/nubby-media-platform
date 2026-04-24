import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant }) {
  const styles =
    variant === "secondary"
      ? "border border-gold/70 bg-transparent text-gold hover:bg-gold/10"
      : variant === "ghost"
      ? "bg-white/[0.03] text-text-primary hover:bg-white/[0.08]"
      : "bg-accent text-black shadow-glow hover:bg-accent-soft";

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
