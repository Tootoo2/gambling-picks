import { combineReducers } from "redux";
import auth from "./auth";
import user from "./userReducer";

export default combineReducers({
  auth,
  user,
});
