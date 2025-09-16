// src/utils/api.js
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Signup
export const signup = async (userData) => {
  const res = await api.post("/users/register", userData);
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

// Login
export const login = async (credentials) => {
  const res = await api.post("/users/login", credentials);
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// Profile
export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

// Products
export const getProducts = async () => {
  const res = await api.get("/products/");
  return res.data;
};

// Cart APIs
export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post("/cart/add", { productId, quantity });
  return res.data;
};

export const getCart = async () => {
  const res = await api.get("/cart/");
  return res.data;
};

export const updateCart = async (productId, quantity) => {
  const { data } = await api.put("/cart/update", { productId, quantity });
  return data;
};

// ✅ New: Place Order
export const placeOrder = async ({ shippingAddress }) => {
  if (!shippingAddress) throw new Error("Shipping address is required");
  const res = await api.post("/order/place", { shippingAddress });
  return res.data;
};


export default api;
