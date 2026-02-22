import { useState } from "react";
import { AuthContext } from "./authContext";
import type { User, AuthContextType } from "./auth.context.types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [token, setToken] = useState<string | null>(() => {
  return localStorage.getItem("token");
});

const [user, setUser] = useState<User | null>(() => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return null;
  }
});


  const login = ({ user, token }: { user: User; token: string }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: Boolean(token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
