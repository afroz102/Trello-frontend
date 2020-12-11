// import { CONSTANTS } from './../actionType';
import axios from 'axios';
import { setActiveBoard } from './boardActions';

const token = localStorage.getItem('auth-token');
// Config header for axios
const config = {
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:5000',
    'Content-Type': 'application/json',
    "x-auth-token": token
  },
};

// create a new Card
export const addCard = (title, listId, boardID) => async (dispatch) => {

  // Set body
  const body = JSON.stringify({ title, listId });

  await axios.post(`${process.env.REACT_APP_API_URL}/card/create`, body, config)
    .then((response) => {

      // console.log('response create list: ', response);
      dispatch(setActiveBoard(boardID));

      // dispatch({
      //   type: CONSTANTS.ADD_CARD,
      //   payload: response.data
      // });

    }).catch((err) => {
      console.log(err);
    });
}

export const editCard = (cardId, listId, newTitle, boardID) => async (dispatch) => {
  // Set body
  const body = JSON.stringify({ cardId, listId, newTitle });

  await axios.post(`${process.env.REACT_APP_API_URL}/card/edit`, body, config)
    .then((response) => {

      // console.log('response edited list: ', response);
      dispatch(setActiveBoard(boardID));

      // dispatch({
      //   type: CONSTANTS.EDIT_CARD,
      //   payload: response.data
      // });

    }).catch((err) => {
      console.log(err);
    });
};

export const deleteCard = (cardId, listId, boardID) => async (dispatch) => {
  // Set body
  const body = JSON.stringify({ cardId, listId });
  await axios.post(`${process.env.REACT_APP_API_URL}/card/delete`, body, config)
    .then((response) => {
      // console.log('response delete card: ', response);
      dispatch(setActiveBoard(boardID));
      // dispatch({
      //   type: CONSTANTS.DELETE_CARD,
      //   payload: response.data
      // });

    }).catch((err) => {
      console.log(err);
    });
};