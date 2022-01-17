import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Login from "./Login";

const RequireLogin = () => {
  const { user, logout, isLoggedIn } = useContext(UserContext);

  console.log("in require login: isLoggedIn", isLoggedIn);
  return user.username ? (
    <div className="user-logged-section ">
      <p>
        Hello, {user.username} <button onClick={logout}>Logout </button>{" "}
      </p>
    </div>
  ) : (
    <Login />
  );
};

export default RequireLogin;
