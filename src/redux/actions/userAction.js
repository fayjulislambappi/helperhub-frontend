import { toast } from "react-toastify";
import {
    // SET_AUTH_TOKEN,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from '../constants/userConstant';
import axiosInstance from "../../pages/axiosInstance";


export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/signin`, user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!"); 
        console.log("sign in from userAction")
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


// user sign up action
// export const userSignInAction = (user) => async (dispatch) => {
//     dispatch({ type: USER_SIGNIN_REQUEST });
//     try {
//         // adding api address, was only double quotations
//         const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/signin`, user);
//         if (response && response.data) {
//             const { data } = response;
//             localStorage.setItem('token', data.token); // Assuming the token is returned in the response as data.token
//             setAuthToken(data.token); // Set the authorization token for all requests
//             dispatch({
//                 type: USER_SIGNIN_SUCCESS,
//                 payload: data
//             });
//             toast.success('Login Successfully!');
//             console.log('sign in from userAction');
//         } else {
//             // Handle the case when the response or its data is undefined
//             throw new Error('Invalid response received');
//         }
//     } catch (error) {
//         const errorMessage = error.response ? error.response.data.error : 'An unexpected error occurred';
//         dispatch({
//             type: USER_SIGNIN_FAIL,
//             payload: errorMessage
//         });
//         toast.error(errorMessage);
//     }
// };



export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        // adding api address, was only double quotations
        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/signup`, user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem('userInfo');
        // 
        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/logout`);
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axiosInstance.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}



