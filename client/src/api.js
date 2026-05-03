import axios from "axios";

// 🔥 Base URL (safe fallback + no double slash issue)
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error("❌ VITE_API_URL is missing in environment variables");
}

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// 🔐 REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ==============================
// ❌ RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 Better debug logs
    if (error.response) {
      console.error("❌ API ERROR:", error.response.data);
    } else {
      console.error("❌ NETWORK ERROR:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
