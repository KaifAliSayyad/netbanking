import { thunk } from "redux-thunk";
import { UserReducer } from "./UserReducer";
import { applyMiddleware, compose, createStore } from "redux";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStoreHook(BookReducer);
const store = createStore(UserReducer, composeEnhancer(applyMiddleware(thunk)));

export  default store ;