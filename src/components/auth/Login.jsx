import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/actions/userAction";
import { ToastContainer } from "react-toastify";
import "../../styles/auth.css";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const ButtonLogin = styled(Button)`
  width: 100%;
  && {
    color: white;
    background: #21710c;
  }
  :hover {
    color: #305d24;
    background: #97b2b9;
    background-color: #5ab143 !important;
  }
`;
const LoginDiv = styled.div`
  margin-top: 5%;
  width: 25%;
  padding: 2% 4% 2% 4%;
  display: flex;
  flex-direction: column;
  align-item: center;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  background-color: lightgrey;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const userData = useSelector((state) => state.user);
  const isAuthenticated = userData.isAuthenticated;

  const dispatch = useDispatch();

  // Handle change from  Inputs
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  // const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    dispatch(userLoginAction({ email, password }));
    // history.push("/");
  };
  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/board" />
      ) : (
        <>
          <ToastContainer />
          <LoginDiv>
            <h2 style={{ textAlign: "center", margin: "20px 0 20px 0" }}>
              Log in
            </h2>

            <form className="form" onSubmit={submit}>
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                onChange={handleChange("email")}
              />

              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                onChange={handleChange("password")}
              />

              <ButtonLogin type="submit">Log in</ButtonLogin>
            </form>
          </LoginDiv>
        </>
      )}
    </>
  );
};
export default Login;

/*
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import "../../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/api/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      //   console.log(err);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2>Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};
export default Login;
*/
