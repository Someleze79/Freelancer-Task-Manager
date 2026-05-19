// ======================================================
// 🔐 AUTH CONTEXT (GLOBAL AUTH STATE MANAGEMENT)
// ======================================================

import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Provider component (wraps the app)
export const AuthProvider = ({ children }) => {

  // Store logged-in user (persisted in localStorage)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // ======================================================
  // 🔑 LOGIN FUNCTION
  // ======================================================
  const login = (data) => {
    // Save user + token in localStorage
    localStorage.setItem("user", JSON.stringify(data));

    // Update state
    setUser(data);
  };

  // ======================================================
  // 🚪 LOGOUT FUNCTION
  // ======================================================
  const logout = () => {
    // Remove user from storage
    localStorage.removeItem("user");

    // Clear state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);