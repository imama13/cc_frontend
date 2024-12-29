import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const jwt_decode = jwtDecode;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const jwt_token = localStorage.getItem("jwt_token");

    if (savedUser && jwt_token) {
      const decodedToken = jwt_decode(jwt_token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        // Token expired, clear data
        localStorage.removeItem("user");
        localStorage.removeItem("jwt_token");
        return null;
      }
      return JSON.parse(savedUser); // Token valid, return saved user
    }

    return null;
  });

  const login = (username, jwt_token) => {
    const decodedToken = jwt_decode(jwt_token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      throw new Error("Cannot login: Token is expired");
    }

    setUser({ username });
    localStorage.setItem("user", JSON.stringify({ username }));
    localStorage.setItem("jwt_token", jwt_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwt_token");
  };

  const getToken = () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      throw new Error("No token found. Please login again.");
    }
    return token;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

