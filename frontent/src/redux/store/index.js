import { composeWithDevTools } from "@redux-devtools/extension";
import reducer from '../reducer';

const { legacy_createStore } = require("redux");

const store = legacy_createStore(reducer, composeWithDevTools());

export default store;
