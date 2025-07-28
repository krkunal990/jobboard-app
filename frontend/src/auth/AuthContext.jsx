import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );

  const login = async (username, password) => {
    const res = await api.post("token/", { username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    const userRes = await api.get("accounts/me/");
    setUser(userRes.data);
    localStorage.setItem("user", JSON.stringify(userRes.data));
  };

  const logout = () => {
    localStorage.clear();
    setUser(null); // You can also call api.post("logout/") if your backend supports logout endpoint
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

