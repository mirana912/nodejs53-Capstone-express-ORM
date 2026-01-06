// src/services/api.service.js
// ==========================================
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
};

// Image APIs
export const imageAPI = {
  getAll: () => api.get("/images"),
  search: (keyword) => api.get(`/images/search?name=${keyword}`),
  getById: (id) => api.get(`/images/${id}`),
  getComments: (id) => api.get(`/images/${id}/comments`),
  checkSaved: (id) => api.get(`/images/${id}/saved`),
  addComment: (id, data) => api.post(`/images/${id}/comments`, data),
  save: (id) => api.post(`/images/${id}/save`),
  unsave: (id) => api.delete(`/images/${id}/save`),
  upload: (formData) =>
    api.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/images/${id}`),
};

// User APIs
export const userAPI = {
  getById: (id) => api.get(`/users/${id}`),
  getSavedImages: (id) => api.get(`/users/${id}/saved-images`),
  getCreatedImages: (id) => api.get(`/users/${id}/created-images`),
  update: (id, data) => api.put(`/users/${id}`, data),
};

export default api;

// ==========================================
