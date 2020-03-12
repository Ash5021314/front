import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import layoutReducer from "./reducers/layoutReducer";
import messageReducer from "./reducers/messageReducer";
import doorsReducer from "./reducers/doorsReducer";

let rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  messages: messageReducer,
  doors: doorsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
