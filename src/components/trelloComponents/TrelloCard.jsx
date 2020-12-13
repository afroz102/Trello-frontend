import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

import TrelloButton from "./trelloFormComponents/TrelloButton";
import TrelloForm from "./trelloFormComponents/TrelloForm";
import { editCard, deleteCard } from "../../redux/actions/cardsActions";

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const TrelloCard = React.memo(
  ({ text, id, listID, index, dispatch, boardID }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cardText, setText] = useState(text);

    const closeForm = (e) => {
      setIsEditing(false);
    };

    const handleChange = (e) => {
      setText(e.target.value);
    };

    const saveCard = (e) => {
      e.preventDefault();
      dispatch(editCard(id, listID, cardText, boardID));
      setIsEditing(false);
    };

    const handleDeleteCard = (e) => {
      dispatch(deleteCard(id, listID, boardID));
    };

    const renderEditForm = () => {
      return (
        <TrelloForm
          text={cardText}
          onChange={(e) => handleChange(e)}
          closeForm={closeForm}
        >
          <TrelloButton
            // onMouseDown={(e) => saveCard(e)}
            onClick={(e) => saveCard(e)}
          >
            Save
          </TrelloButton>
        </TrelloForm>
      );
    };

    const renderCard = () => {
      return (
        <Draggable draggableId={String(id)} index={index}>
          {(provided) => (
            <CardContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onDoubleClick={() => setIsEditing(true)}
            >
              <Card>
                <EditButton
                  onMouseDown={() => setIsEditing(true)}
                  fontSize="small"
                >
                  edit
                </EditButton>
                <DeleteButton
                  fontSize="small"
                  onClick={(e) => handleDeleteCard(e)}
                >
                  delete
                </DeleteButton>

                <CardContent>
                  <Typography>{text}</Typography>
                </CardContent>
              </Card>
            </CardContainer>
          )}
        </Draggable>
      );
    };

    return isEditing ? renderEditForm() : renderCard();
  }
);

export default connect()(TrelloCard);
