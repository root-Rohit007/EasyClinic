import React, { useEffect, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../Actions/userActions";
import { useAlert } from "react-alert";

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login");

    dispatch(login(loginEmail, loginPassword));

    // const { data } = await axios.post(
    //   "/api/v2/login",
    //   { email: loginEmail, password: loginPassword },
    //   config
    // );

    // console.log(data);
  };

  useEffect(() => {
    if (error) {
      // console.log("error");
      alert.error(error);
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <form className="loginForm" onSubmit={loginSubmit}>
            <div>
              <h1>Login</h1>
            </div>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
