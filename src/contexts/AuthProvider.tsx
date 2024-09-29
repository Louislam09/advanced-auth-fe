/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import * as api from "@/services/api";

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.getCurrentUser();
      setUser(response.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.login(email, password);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err) {
      setError(
        // @ts-expect-error
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.signup(name, email, password);
      setUser(response.user);
      router.push("/verify-email");
    } catch (err) {
      setError(
        // @ts-expect-error
        err.response?.data?.message || "An error occurred during signup."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.logout();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError(
        // @ts-expect-error
        err.response?.data?.message || "An error occurred during logout."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.verifyEmail(code);
      setUser(response.user);
      router.push("/dashboard");
    } catch (err) {
      setError(
        // @ts-expect-error
        err.response?.data?.message ||
          "An error occurred during email verification."
      );
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    setError(null);
    try {
      await api.resendVerificationEmail();
    } catch (err) {
      setError(
        // @ts-expect-error
        err.response?.data?.message ||
          "An error occurred while resending the verification email."
      );
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.forgotPassword(email);
      router.push("/verify-email");
    } catch (err) {
      setError(
        // @ts-expect-error
        err.response?.data?.message ||
          "An error occurred while processing your request."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.resetPassword(token, newPassword);
      router.push("/login");
    } catch (err) {
      setError(
        // @ts-expect-error
        err.response?.data?.message ||
          "An error occurred while resetting your password."
      );
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    resendVerificationEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
