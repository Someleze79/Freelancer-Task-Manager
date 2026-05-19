// ======================================================
// 🌐 PREMIUM AXIOS INSTANCE
// ======================================================

import axios from "axios";

// ======================================================
// 🔥 REACT HOT TOAST
// ======================================================

import toast from "react-hot-toast";

// ======================================================
// 🌍 CREATE AXIOS INSTANCE
// ======================================================

const API = axios.create({

  // ======================================================
  // 🌐 BACKEND URL
  // ======================================================

  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api"
});

// ======================================================
// 🔐 REQUEST INTERCEPTOR
// ======================================================

API.interceptors.request.use(

  (req) => {

    // ======================================================
    // 👤 GET USER
    // ======================================================

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // ======================================================
    // 🪪 ATTACH TOKEN
    // ======================================================

    if (user?.token) {

      req.headers.Authorization =
        `Bearer ${user.token}`;
    }

    return req;
  },

  (error) => {

    return Promise.reject(error);
  }
);

// ======================================================
// ❌ RESPONSE INTERCEPTOR
// ======================================================

API.interceptors.response.use(

  // ======================================================
  // ✅ SUCCESS RESPONSE
  // ======================================================

  (response) => response,

  // ======================================================
  // ❌ ERROR RESPONSE
  // ======================================================

  (error) => {

    // ======================================================
    // 🚫 UNAUTHORIZED
    // ======================================================

    if (error.response?.status === 401) {

      toast.error(
        "Session expired. Please login again."
      );

      // Clear user
      localStorage.removeItem("user");

      // Redirect to login
      window.location.href = "/";
    }

    // ======================================================
    // 🚫 SERVER ERROR
    // ======================================================

    if (error.response?.status === 500) {

      toast.error(
        "Server error occurred"
      );
    }

    // ======================================================
    // 🌐 NETWORK ERROR
    // ======================================================

    if (!error.response) {

      toast.error(
        "Network error. Check your connection."
      );
    }

    return Promise.reject(error);
  }
);

export default API;