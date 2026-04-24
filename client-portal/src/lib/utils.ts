export function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export function fileTypeLabel(type?: string) {
  if (!type) return "Unknown";
  return type.split("/").pop()?.toUpperCase() ?? type;
}
