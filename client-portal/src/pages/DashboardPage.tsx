import { Activity, FolderKanban, HardDrive, Link2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useAuditLogs, useMedia } from "@/hooks/useMedia";
import { formatDate } from "@/lib/utils";

function Stat({ label, value, note, icon }: { label: string; value: string; note?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-bg-card p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-text-primary">{value}</p>
          {note ? <p className="mt-2 text-sm text-accent">{note}</p> : null}
        </div>
        <div className="rounded-2xl border border-accent/20 bg-accent/10 p-3 text-accent">{icon}</div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const media = useMedia().data ?? [];
  const audit = useAuditLogs().data ?? [];
  const activeFiles = media.filter((item) => item.fileStatus?.toLowerCase() !== "archived");
  const queued = media.filter((item) => item.processingStatus?.toLowerCase() === "queued");
  const shared = media.filter((item) => item.visibilityLevel?.toLowerCase() === "shared");
  const storageUsed = media.reduce((sum, item) => sum + (item.fileSizeMb ?? 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="section-kicker">Overview</p>
        <h1 className="mt-2 section-title">Welcome back</h1>
        <p className="mt-3 max-w-3xl muted-copy">Here’s what’s happening with your media delivery environment right now.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total Files" value={String(media.length)} note={`+${queued.length} queued`} icon={<FolderKanban className="h-5 w-5" />} />
        <Stat label="Storage Used" value={`${storageUsed.toFixed(1)} GB`} note={`${activeFiles.length} active assets`} icon={<HardDrive className="h-5 w-5" />} />
        <Stat label="Shared Links" value={String(shared.length)} note="Current shared visibility" icon={<Link2 className="h-5 w-5" />} />
        <Stat label="Activity" value={String(audit.length)} note="Recent tracked actions" icon={<Activity className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr,0.7fr]">
        <Card title="Recent Uploads" subtitle="Latest files returned by the current backend">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {media.slice(0, 6).map((item) => (
              <div key={item.fileId} className="rounded-[22px] border border-white/8 bg-white/[0.02] p-4">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-bg-subtle to-black" />
                <div className="mt-4">
                  <p className="truncate font-medium">{item.fileName}</p>
                  <p className="mt-1 text-sm text-text-muted">{item.fileType} • {item.fileSizeMb.toFixed(2)} MB</p>
                  <p className="mt-2 text-xs text-text-soft">{formatDate(item.uploadDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Recent Activity" subtitle="Most recent backend events">
            <div className="space-y-3">
              {audit.slice(0, 5).map((item, index) => (
                <div key={`${item.logId ?? index}-${item.actionTimestamp ?? ""}`} className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                  <p className="font-medium text-text-primary">{item.actionType ?? "Activity"}</p>
                  <p className="mt-1 text-sm text-text-muted">{item.actionDetails ?? item.fileName ?? "No details available"}</p>
                  <p className="mt-2 text-xs text-text-soft">{formatDate(item.actionTimestamp)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Storage Overview" subtitle="Visual snapshot of current usage">
            <div className="flex items-center gap-6">
              <div className="relative grid h-44 w-44 place-items-center rounded-full border border-accent/25 bg-[conic-gradient(#39FF14_0_220deg,#204815_220deg_360deg)] p-4">
                <div className="grid h-full w-full place-items-center rounded-full bg-bg-card text-center">
                  <div>
                    <p className="text-3xl font-semibold">{storageUsed.toFixed(1)} GB</p>
                    <p className="mt-1 text-sm text-text-muted">of 500 GB</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-accent" /> Images</div>
                <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-[#204815]" /> Videos</div>
                <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-gold" /> Other</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
