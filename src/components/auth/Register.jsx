import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userRegisterAction } from "../../redux/actions/userAction";
import { ToastContainer } from "react-toastify";
import "../../styles/auth.css";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const ButtonRegister = styled(Button)`
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
const RegisterDiv = styled.div`
  margin-top: 5%;
  width: 30%;
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const { email, name, password, passwordCheck } = formData;
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
    dispatch(userRegisterAction({ email, name, password, passwordCheck }));
    // history.push("/login");
    // setFormData({ name: "", email: "", password: "", passwordCheck: "" });
  };

  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/board" />
      ) : (
        <>
          <ToastContainer />
          <RegisterDiv>
            <h2 style={{ textAlign: "center", margin: "20px 0 20px 0" }}>
              Register
            </h2>
            <form className="form" onSubmit={submit}>
              <label htmlFor="register-display-name">Name</label>
              <input
                id="register-display-name"
                type="text"
                onChange={handleChange("name")}
              />

              <label htmlFor="register-email">Email</label>
              <input
                id="register-email"
                type="email"
                onChange={handleChange("email")}
              />

              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                onChange={handleChange("password")}
              />
              <label htmlFor="register-confirm-password">
                Confirm Password
              </label>
              <input
                id="register-confirm-password"
                type="password"
                onChange={handleChange("passwordCheck")}
              />
              <ButtonRegister type="submit">Register</ButtonRegister>
            </form>
          </RegisterDiv>
        </>
      )}
    </>
  );
};

export default Register;

/*
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import "../../styles/auth.css";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, name };
      await Axios.post("http://localhost:5000/api/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      // console.log(err);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;

*/
