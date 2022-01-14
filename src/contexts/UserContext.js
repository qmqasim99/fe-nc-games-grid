import { createContext, useState } from "react";
import { getUser } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(false);
    console.log("login username ", user.username);
    getUser("jessjelly")
      .then((data) => {
        console.log("user data in Context ", data);
        setUser({});
        setUser(data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setUser({});
        setIsLoggedIn(false);
      });
  };

  const logout = () => {
    setUser({});
  };

  //const isLoggedIn = !!user.username;
  console.log("isLoggedin ", isLoggedIn, user.username);

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
