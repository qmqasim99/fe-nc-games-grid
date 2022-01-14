import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Login from "./Login";

const RequireLogin = () => {
  const { user, logout, isLoggedIn } = useContext(UserContext);

  console.log("in require login: isLoggedIn", isLoggedIn);
  return user.username ? (
    <>
      <p>Hello, {user.username}</p>
      <button onClick={logout}>Logout </button>{" "}
    </>
  ) : (
    <Login />
  );
};

export default RequireLogin;
