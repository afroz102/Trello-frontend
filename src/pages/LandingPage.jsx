import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const ButtonLogin = styled(Button)`
  && {
    color: white;
    background: #5aac44;
  }
  :hover {
    color: #305d24;
    background: #97b2b9;
    background-color: #97b2b9 !important;
  }
`;
const LandingDivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const LandingPage = () => {
  const userData = useSelector((state) => state.user);
  const isAuthenticated = userData.isAuthenticated;

  return (
    <div className="page">
      {isAuthenticated ? (
        <Redirect to="/board" />
      ) : (
        <LandingDivContainer>
          <h2>You are not logged In.</h2>
          <Link to="/login">
            <ButtonLogin>Log in</ButtonLogin>
          </Link>
        </LandingDivContainer>
      )}
    </div>
  );
};

export default LandingPage;
/*
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const userData = useSelector((state) => state.user);
  let user;
  if (userData) user = userData.user;
  // console.log("user: ", user);

  return (
    <div className="page">
      {user ? (
        <h1>Welcome {user.user.name}</h1>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
};

export default Home;
*/
