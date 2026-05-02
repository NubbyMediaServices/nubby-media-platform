export function Stat({
  label,
  value,
  tone = "default"
}: {
  label: string;
  value: string | number;
  tone?: "default" | "brand" | "success";
}) {
  const toneClass =
    tone === "brand"
      ? "bg-brand-50 text-brand-700"
      : tone === "success"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-50 text-slate-700";

  return (
    <div className={`rounded-3xl p-5 ${toneClass}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em]">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}
