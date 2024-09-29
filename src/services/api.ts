import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const signup = async (name: string, email: string, password: string) => {
  const response = await api.post("/signup", { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const verifyEmail = async (code: string) => {
  const response = await api.post("/verify-email", { code });
  return response.data;
};

export const resendVerificationEmail = async () => {
  const response = await api.post("/resend-verification-email");
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await api.post(`/reset-password/${token}`, { newPassword });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get(`/me`);
  return response.data;
};
