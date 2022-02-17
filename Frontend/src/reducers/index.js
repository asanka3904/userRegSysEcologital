import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { getUserReducer, userAlldataReducer } from "./userReducer";

export default combineReducers({
  auth: authReducer,
  user: getUserReducer,
  errors: errorReducer,
  userAlldata: userAlldataReducer,
});
