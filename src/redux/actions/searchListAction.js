import axios from 'axios';
import { CONSTANTS } from './../actionType';


const token = localStorage.getItem('auth-token');
// Config header for axios
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        "x-auth-token": token
    },
};

// Search query
export const searchLists = (searchQuery, boardId) => async (dispatch) => {
    // Set body
    const body = JSON.stringify({ searchQuery, boardId });

    await axios.post(`${process.env.REACT_APP_API_URL}/search`, body, config)
        .then((response) => {
            console.log('response getBoard: ', response);

            dispatch({
                type: CONSTANTS.SEARCH_LISTS_IN_BOARD,
                payload: response.data
            });

        }).catch((err) => {
            console.log(err.response.data.error);
        });
}

export const getSearchLists = (searchQuery, boardId) => async (dispatch) => {
    // Set body
    // const body = JSON.stringify({ searchQuery, boardId });

    await axios.post(`${process.env.REACT_APP_API_URL}/search/task/:${searchQuery}`, config)
        .then((response) => {
            console.log('response get search query: ', response);

            dispatch({
                type: CONSTANTS.GET_SEARCH_LISTS_IN_BOARD,
                payload: response.data
            });

        }).catch((err) => {
            console.log(err.response.data.error);
        });
}
