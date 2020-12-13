import React, { useState } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";

import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";
import { editTitle, deleteList } from "../../redux/actions/listsActions";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const DivContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const ListTitle = styled.h4`
  font-weight: 500;
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

const TrelloList = ({ title, cards, listID, index, dispatch, boardID }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  // console.log("props: ");
  const renderEditInput = () => {
    return (
      <form onSubmit={(e) => handleFinishEditing(e)}>
        <StyledInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={(e) => handleFinishEditing(e)}
        />
      </form>
    );
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = (e) => {
    setIsEditing(false);
    dispatch(editTitle(listID, listTitle));
  };

  const handleDeleteList = (e) => {
    dispatch(deleteList(listID, boardID));
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {(provided) => (
              <div>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                    <DivContainer>
                      <TitleContainer onClick={() => setIsEditing(true)}>
                        <ListTitle>{listTitle}</ListTitle>
                      </TitleContainer>
                      <DeleteButton onClick={(e) => handleDeleteList(e)}>
                        delete
                      </DeleteButton>
                    </DivContainer>
                  )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                    <TrelloCard
                      key={card._id}
                      text={card.title}
                      id={card._id}
                      index={index}
                      listID={listID}
                      boardID={boardID}
                    />
                  ))}
                  {provided.placeholder}
                  <TrelloCreate listID={listID} boardID={boardID} />
                </div>
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default connect()(TrelloList);
