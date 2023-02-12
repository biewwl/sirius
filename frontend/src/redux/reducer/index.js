import { combineReducers } from "redux";
import userReducer from "../reducer/userReducer";

const reducer = combineReducers({ userReducer });

export default reducer;
