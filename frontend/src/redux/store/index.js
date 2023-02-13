import { composeWithDevTools } from "@redux-devtools/extension";
import reducer from "../reducer";
import thunk from "redux-thunk";

const { legacy_createStore, applyMiddleware } = require("redux");

const store = legacy_createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
