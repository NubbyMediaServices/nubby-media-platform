import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-soft focus:border-accent/70 focus:ring-4 focus:ring-accent/10 ${props.className ?? ""}`}
    />
  );
}
