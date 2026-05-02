import type { ReactNode } from "react";

export function Card({
  title,
  subtitle,
  children,
  className = "",
  actions
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={`rounded-[24px] border border-white/8 bg-bg-card shadow-soft ${className}`}>
      {(title || subtitle || actions) && (
        <div className="flex items-start justify-between gap-4 border-b border-white/6 px-6 py-5">
          <div>
            {title ? <h2 className="text-lg font-semibold text-text-primary">{title}</h2> : null}
            {subtitle ? <p className="mt-1 text-sm text-text-muted">{subtitle}</p> : null}
          </div>
          {actions}
        </div>
      )}
      <div className="p-6">{children}</div>
    </section>
  );
}
