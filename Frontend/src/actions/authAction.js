import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, ALL_USER } from "./types";

//Register User

const url = "http://localhost:3005";
export const registerUser = (userData, navigate) => (dispatch) => {
  axios
    .post(`${url}/api/users/register`, userData)
    .then((res) => navigate("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${url}/api/users/login`, userData)
    .then((res) => {
      // debugger;
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));

      //debugger;
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded_data) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded_data,
  };
};

// Logout user
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//get all users detail
export const getAllUser = () => (dispatch) => {
  axios
    .get(`${url}/api/users/profile`)
    .then((res) =>
      dispatch({
        type: ALL_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
