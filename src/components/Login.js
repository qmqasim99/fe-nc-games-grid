import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, setUser, login, logout, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);

  console.log("user in form", user.username);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setUser({ username: username });
    // console.log("in handle submit ", username);

    setIsError(false);

    //login();
    //setUsername("");
    // setIsLoggedIn(true);

    // jessjelly
    getUser(username)
      .then((data) => {
        console.log("user data in Context ", data);
        setUser({});
        setUser(data);
        setIsLoggedIn(true);
        setErrorMessage("");
      })
      .catch((error) => {
        setIsError(true);
        setUser({});
        setIsLoggedIn(false);
        setErrorMessage(error.response.data.msg);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>

      {isError && (
        <p className="error-message-card ">Login error: {errorMessage}</p>
      )}
    </>
  );
};

export default Login;
