import { Card } from "@/components/ui/Card";
import { useAuditLogs } from "@/hooks/useMedia";
import { formatDate } from "@/lib/utils";

export function AuditPage() {
  const { data = [], isLoading } = useAuditLogs();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Compliance</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Audit activity</h1>
        <p className="mt-2 text-sm text-slate-500">Operational event stream for user activity, file actions, and status tracking.</p>
      </div>

      <Card title="Audit log" subtitle="Most recent records returned from /audit">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading audit records…</p>
        ) : (
          <div className="space-y-3">
            {data.map((item, idx) => (
              <div key={`${item.logId ?? idx}-${item.actionTimestamp ?? ""}`} className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-900">{item.actionType ?? "Action"}</p>
                    <p className="text-sm text-slate-500">{item.actionDetails ?? item.fileName ?? "No detail available"}</p>
                  </div>
                  <p className="text-xs text-slate-400">{formatDate(item.actionTimestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
