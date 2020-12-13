import axios from 'axios';
import { CONSTANTS } from './../actionType';
import { setActiveBoard } from './boardActions';


const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem('auth-token');
// Config header for axios
const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    "x-auth-token": token
  },
};


// create a List Title
export const addList = (title, boardId) => async (dispatch) => {

  // Set body
  const body = JSON.stringify({ title, boardId });

  await axios.post(`${API_URL}/list/create`, body, config)
    .then((response) => {

      // console.log('response create list: ', response);
      dispatch(setActiveBoard(boardId));
      // dispatch({
      //   type: CONSTANTS.ADD_LIST,
      //   payload: response.data
      // });

    }).catch((err) => {
      console.log(err);
    });
}


export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID
      }
    });
  };
};

export const editTitle = (listId, newTitle) => async (dispatch) => {
  // Set body
  const body = JSON.stringify({ newTitle, listId });

  await axios.post(`${API_URL}/list/edit`, body, config)
    .then((response) => {

      // console.log('response edit list: ', response);

      // dispatch({
      //   type: CONSTANTS.EDIT_LIST_TITLE,
      //   payload: response.data
      // });

    }).catch((err) => {
      console.log(err);
    });
}

export const deleteList = (listId, boardID) => async (dispatch) => {
  // Set body
  const body = JSON.stringify({ listId });
  await axios.post(`${API_URL}/list/delete`, body, config)
    .then((response) => {
      // console.log('response create list: ', response);
      dispatch(setActiveBoard(boardID));

    }).catch((err) => {
      console.log(err);
    });
};
