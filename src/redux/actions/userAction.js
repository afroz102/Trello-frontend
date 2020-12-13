import axios from 'axios';
import { toast } from 'react-toastify';
import { CONSTANTS } from './../actionType';

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "/api";
// Config header for axios
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
};

// get user details after token verification
export const getUserAction = () => async (dispatch) => {
    try {
        let token = localStorage.getItem('auth-token');
        //For very first time there is not any key or it's value in localStorage, So it return null
        if (token === null) {
            localStorage.setItem('auth-token', "");  //set key in localStorage as authToken and it's value an empty string
            token = "";    // token = "", to send a post request to backend
        }

        // send a post req to verify token
        const tokenRes = await axios.post(`${API_URL}/user/tokenIsValid`, null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "x-auth-token": token
            }
        }); //returns a response True Or False 'Access-Control-Allow-Origin': '*',

        if (tokenRes.data) {
            axios.get(`${API_URL}/user/`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "x-auth-token": token
                }
            })
                .then((response) => {
                    console.log('Get User Response: ', response);
                    dispatch({
                        type: CONSTANTS.GET_USER_DATA,
                        payload: response.data
                    });
                }).catch((err) => {
                    console.log(err);
                });
        }
    } catch (err) {
        console.log('Token verification error: ', err);
    }
}

// Register Action
export const userRegisterAction = ({ email, password, passwordCheck, name }) => async (dispatch) => {
    // Validating form in frontend 
    if (name && email && password && passwordCheck) {
        if (password === passwordCheck) {
            if (password.length > 5) {
                // Set body
                // const body = JSON.stringify({
                //     email,
                //     password,
                //     passwordCheck,
                //     name
                // });

                axios.post(`${API_URL}/user/register`, { email, password, passwordCheck, name }, config)
                    .then((response) => {
                        console.log('Register Response: ', response);
                        toast.success("User Registered Sucessfully. Please Login to continue..");
                        // dispatch({
                        //     type: CONSTANTS.REGISTER_USER,
                        //     payload: response.data
                        // });
                    }).catch((err) => {
                        toast.error(err.response.data.msg);
                    });
            } else {
                toast.error('The password needs to be at least 6 characters long.');
            }
        } else {
            // console.log("Password do not matches");
            toast.error('Password do not matches');
        }
    } else {
        // console.log("Plese fill all the fields");
        toast.error("Please fill all fields.");
    }
}

// user login Action
export const userLoginAction = ({ email, password }) => async (dispatch) => {
    // Validating form in frontend 
    console.log('login action');
    if (email && password) {
        // Set body
        // const body = JSON.stringify({ email, password });

        axios.post(`${API_URL}/user/login`, { email, password }, config)
            .then((response) => {
                console.log('Login Response: ', response);
                toast.success("Signed In Sucessfully");
                dispatch({
                    type: CONSTANTS.SIGNIN_USER,
                    payload: response.data
                });
            }).catch((err) => {
                console.log('err: ', err);
                toast.error(err.response.data.msg);
            });
    } else {
        toast.error("Please fill all fields.");
    }
}

export const userLogOutAction = () => (dispatch) => {
    toast.success("Logged Out Sucessfully");
    dispatch({
        type: CONSTANTS.LOGOUT
    });
}