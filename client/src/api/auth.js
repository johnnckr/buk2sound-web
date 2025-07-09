import axios from "axios";

export const login = (email, password) =>
  axios.post("/api/auth/login", { email, password });

export const register = (userData) =>
  axios.post("/api/auth/register", userData);

export const forgotPassword = (email) =>
  axios.post("/api/auth/forgot-password", { email });