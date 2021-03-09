import reducer from "./reducer";
import  { applyMiddleware, createStore }  from "redux";
import thunk from "redux-thunk"
// import { createStore } from "redux";
const store = createStore(reducer,applyMiddleware(thunk))

export default store;