import axios from 'axios';
import { CONSTANTS } from './../actionType';




// Get all board in homepage
export const getAllBoard = () => async (dispatch) => {
  const token = localStorage.getItem('auth-token');
  // Config header for axios
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      "x-auth-token": token
    },
  };
  await axios.get(`${process.env.REACT_APP_API_URL}/board`, config)
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

  const token = localStorage.getItem('auth-token');
  // Config header for axios
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      "x-auth-token": token
    },
  };

  await axios.get(`${process.env.REACT_APP_API_URL}/board/${id}`, config)
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

  const token = localStorage.getItem('auth-token');
  // Config header for axios
  const config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5000',
      'Content-Type': 'application/json',
      "x-auth-token": token
    },
  };
  // Set body
  const body = JSON.stringify({ title });

  await axios.post(`${process.env.REACT_APP_API_URL}/board/createboard`, body, config)
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