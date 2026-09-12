// Central API base URL — override with VITE_API_URL in production
// e.g. VITE_API_URL=https://your-backend.onrender.com
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export default API_BASE_URL;
