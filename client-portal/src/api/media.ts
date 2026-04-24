import { api } from "@/api/client";
import type { AuditLog, MediaFile } from "@/types/api";

export async function getMedia(): Promise<MediaFile[]> {
  const { data } = await api.get("/media");
  return Array.isArray(data) ? data : [];
}

export async function uploadMedia(formData: FormData): Promise<MediaFile> {
  const { data } = await api.post("/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return data;
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  const { data } = await api.get("/audit");
  return Array.isArray(data) ? data : [];
}

export async function downloadMedia(fileId: number) {
  const response = await api.get(`/media/${fileId}/download`, {
    responseType: "blob"
  });
  return response.data as Blob;
}
