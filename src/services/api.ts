const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.nubbymedia.com";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("scmsp_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      errorText || `API request failed with status ${response.status}`
    );
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {} as T;
}

export async function apiFormRequest<T>(
  endpoint: string,
  formData: FormData,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("scmsp_token");

  const headers: HeadersInit = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    method: options.method || "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      errorText || `Upload request failed with status ${response.status}`
    );
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {} as T;
}

export { API_BASE_URL };