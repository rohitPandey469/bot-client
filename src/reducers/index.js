import { combineReducers } from "redux";
import queriesReducer from "./queries";
import { currentUserReducer } from "./currentUser";
import authReducer from "./auth";
import questionsReducer from "./questions";
import usersReducer from "./usersReducer";

export default combineReducers({
  queriesReducer,
  currentUserReducer,
  authReducer,
  questionsReducer,
  usersReducer,
});
