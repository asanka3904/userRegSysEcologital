import { GET_USER, ALL_USER } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  loading: true,
  data: {},
};

export function getUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export function userAlldataReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_USER:
      return {
        ...state,

        isAuthenticated: !isEmpty(action.payload),
        data: action.payload,
        loading: !isEmpty(action.payload) == false ? true : false,
      };
    default:
      return state;
  }
}
