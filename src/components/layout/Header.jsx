import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "./AuthOptions";
import "../../styles/header.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ReactComponent as Logo } from "../../assets/images/trello-logo-white.svg";

const SearchCardInput = styled.input`
  width: 60%;
  height: 30px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
  box-sizing: border-box;
  box-shadow: 0 2px 4px grey;
  align-self: center;
  background-color: #cbcbd2;
  :hover {
    background-color: white !important;
  }
  :focus {
    width: 100%;
    padding-left: 10%;
    ::placeholder {
      color: transparent;
    }
  }
  ::placeholder {
    text-align: center;
  }
`;

const Header = () => {
  const userData = useSelector((state) => state.user);
  const isAuthenticated = userData.isAuthenticated;
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <header id="fixed-header" className="header">
      <div className="title-search-div">
        <Link to="/board">
          <h1 className="header-title">BOARDS</h1>
        </Link>
        {isAuthenticated ? (
          <form onSubmit={onSubmit}>
            <div className="search-header">
              <SearchCardInput type="text" placeholder="Search cards" />
            </div>
          </form>
        ) : null}
      </div>
      <Logo className="logo" />
      <AuthOptions />
    </header>
  );
};

export default Header;
