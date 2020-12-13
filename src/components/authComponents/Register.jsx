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