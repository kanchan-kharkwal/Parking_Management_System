// store.js
import { createStore, combineReducers } from "redux";
import Reducer from "./reducers";

const rootReducer = combineReducers({
  auth: Reducer,
});

const store = createStore(rootReducer);

export default store;
