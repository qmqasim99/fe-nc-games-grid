import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, setUser, login, logout, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    getUser(username)
      .then((data) => {
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
      <form onSubmit={handleSubmit} className="user-login-section">
        <label className="user-login-section-form">
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button className="user-login-section-form">Login</button>
      </form>

      {isError && (
        <p className="error-message-card ">Login error: {errorMessage}</p>
      )}
    </>
  );
};

export default Login;
