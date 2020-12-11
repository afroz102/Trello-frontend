import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
// import { connect } from "react-redux";

import BoardThumbnail from "../components/BoardThumbnail";
import { addBoard, getAllBoard } from "../redux/actions/boardActions";

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 28px;
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 2px;
  border: none;
  outline-color: darkGray;
  box-shadow: 0 2px 4px grey;
  align-self: center;
  background-color: #cbcbd2;
  :focus {
    outline: none;
    text-align: center;
    background-color: white;
    ::placeholder {
      text-align: center;
      color: transparent;
    }
  }
  ::placeholder {
    text-align: center;
  }
`;

const Home = () => {
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const boards = useSelector((state) => state.boards);
  const userData = useSelector((state) => state.user);
  // console.log('userData in redux state: ', userData);
  const isAuthenticated = userData.isAuthenticated;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  // get board
  useEffect(() => {
    console.log("useEffect testing: ", boards);
    dispatch(getAllBoard());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
    dispatch(getAllBoard());
    setNewBoardTitle("");
  };

  const renderBoards = () => {
    if (boards && boards.board && boards.board.length !== 0) {
      return boards.board.map((board) => {
        // console.log('board: ', board);
        return (
          <Link
            key={board._id}
            to={`/board/${board._id}`}
            style={{ textDecoration: "none", marginTop: "50px" }}
          >
            <BoardThumbnail {...board} />
          </Link>
        );
      });
    } else {
      return (
        <h2 style={{ marginTop: "50px", color: "#42596d", fontSize: "40px" }}>
          {" "}
          You don't have any board. Create one below...
        </h2>
      );
    }
  };

  const renderCreateBoard = () => {
    return (
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          textAlign: "center",
          marginTop: "50px",
          border: "2px solid transpatent",
          borderRadius: "10px",
          backgroundColor: "#807b7d",
        }}
      >
        <CreateTitle>Create a new Board</CreateTitle>
        <CreateInput
          onChange={(e) => handleChange(e)}
          value={newBoardTitle}
          placeholder="Add your board title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <HomeContainer>
          <Thumbnails>{renderBoards()}</Thumbnails>
          {renderCreateBoard()}
        </HomeContainer>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Home;
