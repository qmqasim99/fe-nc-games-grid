import { createContext, useState } from "react";
import { getUser } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {};

  const logout = () => {
    setUser({});
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
