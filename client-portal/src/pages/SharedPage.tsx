import { Card } from "@/components/ui/Card";
import { useMedia } from "@/hooks/useMedia";

export function SharedPage() {
  const { data = [] } = useMedia();
  const shared = data.filter((item) => item.visibilityLevel?.toLowerCase() === "shared");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Access</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Shared assets</h1>
        <p className="mt-2 text-sm text-slate-500">View the subset of assets flagged as shared in the current media response.</p>
      </div>

      <Card title="Shared items" subtitle="Visibility-based filtered view">
        <div className="space-y-3">
          {shared.length === 0 ? (
            <p className="text-sm text-slate-500">No shared items returned by the current API response.</p>
          ) : (
            shared.map((item) => (
              <div key={item.fileId} className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="font-medium text-slate-900">{item.fileName}</p>
                <p className="text-sm text-slate-500">{item.fileDescription ?? "No description"}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
