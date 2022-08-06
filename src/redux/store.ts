import { combineReducers, createStore } from "redux";
import StateReducer from "./reducers/stateReducers";

const reducer = combineReducers({ StateReducer });
export const store = createStore(reducer);
