import { saveAs } from "@/saveAs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useMedia } from "@/hooks/useMedia";
import { downloadMedia } from "@/api/media";
import { fileTypeLabel, formatDate } from "@/lib/utils";

export function MediaPage() {
  const { data = [], isLoading } = useMedia();

  async function handleDownload(fileId: number, fileName: string) {
    const blob = await downloadMedia(fileId);
    saveAs(blob, fileName);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Library</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Media inventory</h1>
        <p className="mt-2 text-sm text-slate-500">Browse current media records and trigger secure downloads.</p>
      </div>

      <Card title="Assets" subtitle="Current media records from the backend">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading media…</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["File", "Type", "Size (MB)", "Status", "Uploaded", ""].map((label) => (
                    <th key={label} className="px-4 py-3 text-left font-medium text-slate-600">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {data.map((item) => (
                  <tr key={item.fileId}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{item.fileName}</p>
                      <p className="text-xs text-slate-500">{item.fileDescription ?? "No description"}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{fileTypeLabel(item.fileType)}</td>
                    <td className="px-4 py-3 text-slate-600">{item.fileSizeMb}</td>
                    <td className="px-4 py-3 text-slate-600">{item.fileStatus}</td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(item.uploadDate)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button className="px-3 py-2 text-xs" onClick={() => handleDownload(item.fileId, item.fileName)}>
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
