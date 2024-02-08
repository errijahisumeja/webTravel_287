import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = async (inputs) => {
    try {
      const res = await axios.post("/auth/login", inputs);

      if (res.data.status !== "active") {
        alert("User is not active!");
        return;
      }

      setCurrentUser({ ...res.data, isAdmin: res.data.is_admin === "admin" });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

   const deletedUser = async () => {
  };

  const isAdmin = () => {
    return currentUser && currentUser.is_admin === "admin";
  };

  

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAdmin,deletedUser }}>
      {children}
    </AuthContext.Provider>
  );
};







