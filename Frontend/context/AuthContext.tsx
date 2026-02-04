"use client";

import { syncTodos } from "@/lib/api";
import { authLogin, authLogut, getCurrentUser } from "@/lib/auth";
import { LoginPayload } from "@/types/Auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  is_login: boolean;
  login: (payload: { email: string; password: string }) => void;
  checkAuth: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [is_login, setIs_login] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      await getCurrentUser();
      setIs_login(true);
    } catch (err) {
      setIs_login(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authLogut();
    setIs_login(false);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (payload: LoginPayload) => {
    await authLogin(payload);

    const localTodosStr = localStorage.getItem("guestTodos");
    const localTodos = localTodosStr ? JSON.parse(localTodosStr) : [];

    if (localTodos.length > 0) {
      await syncTodos(localTodos);
      localStorage.removeItem("guestTodos");
    }

    setIs_login(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ is_login, login, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Gunakan Dalam AuthProvider");
  }

  return context;
};

export default AuthProvider;
