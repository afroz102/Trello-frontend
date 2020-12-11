import axios from 'axios';
import { CONSTANTS } from './../actionType';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const token = localStorage.getItem('auth-token');
// Config header for axios
const config = {
  headers: {
    'Access-Control-Allow-Origin': 'https://hello-trello-backend.herokuapp.com',
    'Content-Type': 'application/json',
    "x-auth-token": token
  },
};

// Get all board in homepage
export const getAllBoard = () => async (dispatch) => {

  await axios.get(`${API_URL}/board`, config)
    .then((response) => {

      // console.log('response getBoard: ', response);

      dispatch({
        type: CONSTANTS.GET_ALL_BOARDS,
        payload: response.data
      });

    }).catch((err) => {
      console.log(err.response.data.error);
    });
}

// get board by id
export const setActiveBoard = (id) => async (dispatch) => {

  await axios.get(`${API_URL}/board/${id}`, config)
    .then((response) => {
      // console.log('response getBoard by id: ', response.data);

      dispatch({
        type: CONSTANTS.SET_ACTIVE_BOARD,
        payload: response.data
      });

    }).catch((err) => {
      console.log(err);
    });
}

// create a board action
export const addBoard = (title) => async (dispatch) => {

  // Set body
  const body = JSON.stringify({ title });

  await axios.post(`${API_URL}/board/createboard`, body, config)
    .then((response) => {

      // console.log('response create board: ', response);

      // dispatch({
      //   type: CONSTANTS.ADD_BOARD,
      //   payload: response.data
      // })

    }).catch((err) => {
      console.log(err);
    });

}