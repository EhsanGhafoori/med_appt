/** Default API matches local Django / course backend (see README). */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export function getApiBase() {
  return API_BASE.replace(/\/$/, "");
}
