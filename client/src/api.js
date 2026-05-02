import axios from "axios";

// 🔥 production backend URL
const BASE_URL = "https://personal-portfolio-4sz6.onrender.com/api";

// axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔐 token attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ❌ error handling (optional but useful)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
