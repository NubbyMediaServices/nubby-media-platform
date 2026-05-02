import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { uploadMedia } from "@/api/media";

export function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [folderId, setFolderId] = useState("1");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file) {
      setStatus("Choose a file before uploading.");
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("folderId", folderId);
    form.append("description", description);

    try {
      await uploadMedia(form);
      setStatus("Upload request submitted successfully.");
      setFile(null);
      setDescription("");
    } catch {
      setStatus("Upload failed. Confirm the backend upload contract matches this form.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Intake</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Upload media</h1>
        <p className="mt-2 text-sm text-slate-500">
          Clean upload form for the current local-storage-backed build. This can stay unchanged when S3 is added later.
        </p>
      </div>

      <Card title="New asset" subtitle="Submit a new media file to the backend">
        <form onSubmit={onSubmit} className="grid gap-4 md:max-w-2xl">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">File</label>
            <input
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Folder ID</label>
            <Input value={folderId} onChange={(event) => setFolderId(event.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
            <Input value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>

          {status ? <p className="text-sm text-slate-600">{status}</p> : null}

          <div>
            <Button type="submit">Submit upload</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
