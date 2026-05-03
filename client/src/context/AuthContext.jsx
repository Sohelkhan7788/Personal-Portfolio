import { createContext, useContext, useState, useEffect } from "react";
import api from "../api"; // 🔥 IMPORTANT (axios नहीं)

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // ==============================
  // 🔥 INIT USER
  // ==============================
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // ==============================
  // 🔥 GET CURRENT USER
  // ==============================
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me"); // ✅ FIXED
      setUser(res.data);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // 🔥 LOGIN (FIXED)
  // ==============================
  const login = async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const { token: newToken, user: newUser } = res.data;

    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);

    return newUser;
  };

  // ==============================
  // 🔥 LOGOUT
  // ==============================
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);