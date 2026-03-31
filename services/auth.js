import api from "./api";

// Login
export const loginUser = async (email, password) => {
  const res = await api.post("/api/auth/login", { email, password });

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

// Signup
export const signupUser = async (email, password) => {
  const res = await api.post("/api/auth/signup", { email, password });
  return res.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Check if logged in
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};

// Get token
export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};