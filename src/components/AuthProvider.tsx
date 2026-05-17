"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "";

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  userType?: string;
  image?: string;
  country?: string;
  default_language?: string;
  permissions?: Record<string, boolean>;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, name: string, userType?: string) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setAuthUser: (userData: User, authToken?: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (storedToken) {
      try {
        const response = await axios.get(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          withCredentials: true,
        });
        setUser(response.data);
        setToken(storedToken);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
    // Try cookie-based auth
    try {
      const response = await axios.get(`${API}/api/auth/me`, { withCredentials: true });
      setUser(response.data);
    } catch {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API}/api/auth/login`, { email, password });
    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (email: string, password: string, name: string, userType?: string) => {
    const response = await axios.post(`${API}/api/auth/register`, { email, password, name, userType });
    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    try {
      await axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true });
    } catch {}
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const setAuthUser = (userData: User, authToken?: string) => {
    setUser(userData);
    if (authToken) {
      localStorage.setItem("token", authToken);
      setToken(authToken);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, login, register, logout, checkAuth, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
