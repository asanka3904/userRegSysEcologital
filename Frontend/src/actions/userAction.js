import axios from "axios";
import { getAllUser } from "./authAction";

import { GET_ERRORS, SET_CURRENT_USER, GET_USER } from "./types";

const url = "http://localhost:3005";

//get user by id
export const getUser = (id, userData) => (dispatch) => {
  axios
    .get(`${url}/api/users/detail/${id}`, userData)
    .then((res) =>
      dispatch({
        type: GET_USER,
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

//edit user by id
export const editUser = (id, userData) => (dispatch) => {
  axios
    .put(`${url}/api/users/detail/${id}`, userData)
    .then((res) => {
      return;
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//delete user by id
export const deleteUser = (id) => (dispatch) => {
  axios
    .delete(`${url}/api/users/detail/${id}`)
    .then((res) => dispatch(getAllUser()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
