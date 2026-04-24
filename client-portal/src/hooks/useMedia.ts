import { useQuery } from "@tanstack/react-query";
import { getAuditLogs, getMedia } from "@/api/media";

export function useMedia() {
  return useQuery({
    queryKey: ["media"],
    queryFn: getMedia
  });
}

export function useAuditLogs() {
  return useQuery({
    queryKey: ["audit"],
    queryFn: getAuditLogs
  });
}
