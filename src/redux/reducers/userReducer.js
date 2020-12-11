// Types
import { CONSTANTS } from "../actionType";

let isUserLoggedIn = false;
const userLoggedIn = localStorage.getItem('user');
if (userLoggedIn) { isUserLoggedIn = true }

// Initial State
const initialState = {
    isAuthenticated: isUserLoggedIn,
    token: localStorage.getItem('auth-token'),
    user: localStorage.getItem('user'),
};

// User Reducers
const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CONSTANTS.GET_USER_DATA:
            return {
                ...state,
                user: payload,
            }

        // login successfully
        case CONSTANTS.SIGNIN_USER:
            // Set Token and user in localstorage
            localStorage.setItem('auth-token', payload.token);
            localStorage.setItem('user', payload.user);
            return {
                ...state,
                isAuthenticated: true,
                token: payload.token,
                user: payload
            };

        case CONSTANTS.LOGOUT:
            // Remove Token and user from localstorage
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null
            };

        /*
        //No need to store register response after register
        case CONSTANTS.REGISTER_USER:
            return {
                ...state,
                token: null,
                user: null
            };
        */

        default:
            return state;
    }
}

export default userReducer;