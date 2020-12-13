import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import TrelloList from "../components/trelloComponents/TrelloList";
import TrelloCreate from "../components/trelloComponents/TrelloCreate";
import { setActiveBoard } from "../redux/actions/boardActions";
import { sort } from "../redux/actions/listsActions";
import LoadingSnipper from "../components/loadingComponent/Loading";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`;

class TrelloBoard extends PureComponent {
  componentDidMount() {
    // set active trello board here
    const { boardID } = this.props.match.params;

    this.props.dispatch(setActiveBoard(boardID));
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { activeBoard } = this.props;

    const userData = this.props.user;
    const isAuthenticated = userData.isAuthenticated;

    let board, lists;
    if (activeBoard) {
      board = activeBoard.board.board;
      lists = activeBoard.board.lists;
      if (!board) {
        return <p>Board not found</p>;
      }
    }

    return (
      <>
        {isAuthenticated ? (
          activeBoard ? (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <h2
                style={{
                  padding: "5px",
                  margin: "20px 0 10px 10px",
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                {board.title}
              </h2>
              <Droppable
                droppableId="all-lists"
                direction="horizontal"
                type="list"
              >
                {(provided) => (
                  <ListsContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {lists.map((list, index) => {
                      // const list = lists[listID];
                      if (list) {
                        const listCards = list.cards;
                        return (
                          <TrelloList
                            listID={list._id}
                            key={list._id}
                            title={list.title}
                            cards={listCards}
                            index={index}
                            boardID={board._id}
                          />
                        );
                      }
                      return [];
                    })}
                    {provided.placeholder}
                    <TrelloCreate list />
                  </ListsContainer>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <LoadingSnipper />
          )
        ) : (
          <Redirect to="/" />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.boards,
  activeBoard: state.activeBoard,
  user: state.user,
});

export default connect(mapStateToProps)(TrelloBoard);
