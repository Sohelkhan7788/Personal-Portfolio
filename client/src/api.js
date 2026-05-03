import axios from "axios";

// 🔥 ENV based URL
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://personal-portfolio-4sz6.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// 🔐 Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ❌ Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
