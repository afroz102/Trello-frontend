import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogOutAction } from "../../redux/actions/userAction";
import { ToastContainer } from "react-toastify";

import styled from "styled-components";
import Button from "@material-ui/core/Button";

const ButtonLogin = styled(Button)`
  && {
    color: white;
    background: #21710c;
  }
  :hover {
    color: #305d24;
    background: #97b2b9;
    background-color: #5ab143 !important;
  }
  margin: 4px !important;
`;
const ButtonSignUp = styled(Button)`
  && {
    color: white;
    background: #21710c;
  }
  :hover {
    color: #305d24;
    background: #97b2b9;
    background-color: #5ab143 !important;
  }
  margin: 4px !important;
`;
const ButtonLogOut = styled(Button)`
  margin: 5px 10px 5px 0 !important;
  && {
    color: white;
    background: #b70d0dbf;
  }
  :hover {
    color: white;
    background: #97b2b9;
    background-color: #ff0101 !important;
  }
`;
const AuthOptions = () => {
  const userData = useSelector((state) => state.user);
  let user;
  if (userData) user = userData.user;

  const dispatch = useDispatch();
  const history = useHistory(); // to push routes

  const goToLoginPage = () => history.push("/login");
  const goToRegisterPage = () => history.push("/register");

  const logOut = () => {
    dispatch(userLogOutAction());
  };

  return (
    <nav className="auth-options">
      <ToastContainer />
      {user ? (
        <ButtonLogOut onClick={logOut}> Log out </ButtonLogOut>
      ) : (
        <>
          <ButtonSignUp onClick={goToRegisterPage}>Sign Up</ButtonSignUp>
          <ButtonLogin onClick={goToLoginPage}>Log In</ButtonLogin>
          {/* <button className="logout-button" onClick={logOut}>
          Log out
        </button> */}
          {/* <button onClick={goToRegisterPage}>Register</button> */}
          {/* <button onClick={goToLoginPage}>Log In</button> */}
        </>
      )}
    </nav>
  );
};

export default AuthOptions;
/*
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/userContext";
const AuthOptions = () => {
  const { userData, setUserData } = useContext(userContext); // Works just like useSelector

  const history = useHistory(); // to push routes
  const goToLoginPage = () => history.push("/login");
  const goToRegisterPage = () => history.push("/register");

  const logOut = () => {
    
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <>
          <button onClick={goToRegisterPage}>Register</button>
          <button onClick={goToLoginPage}>Log In</button>
        </>
      )}
    </nav>
  );
};

export default AuthOptions;
 */
