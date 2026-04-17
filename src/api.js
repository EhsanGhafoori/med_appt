const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://api.stayhealthy.example";

export function getApiBase() {
  return API_BASE.replace(/\/$/, "");
}
