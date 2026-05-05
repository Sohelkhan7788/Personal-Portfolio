import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// ❌ safety check
if (!BASE_URL) {
  console.error("❌ VITE_API_URL missing");
}

const api = axios.create({
  baseURL: `${BASE_URL}/api`, // ✅ always /api here
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
    if (error.response) {
      console.error("❌ API ERROR:", error.response.data);

      // 🔥 AUTO LOGOUT if token invalid
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      }
    } else {
      console.error("❌ NETWORK ERROR:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
