import axios from "axios";
import { tokenStorage } from "@/lib/storage";

// Fallback if env var fails
const FALLBACK_API_URL =
  "https://nubby-media-api-prod.eba-chjwqp4x.us-east-2.elasticbeanstalk.com";

// Read env + force HTTPS
const baseURL =
  (import.meta.env.VITE_API_BASE_URL || FALLBACK_API_URL).replace(/^http:\/\//i, "https://");

// ✅ EXPORT FIX
export const api = axios.create({
  baseURL,
});

// Attach token
api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
