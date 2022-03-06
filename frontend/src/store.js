import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { testReducer } from "./Reducers/testReducers";
import { allUsersReducer, userReducer } from "./Reducers/userReducers";
import { hospitalReducer } from "Reducers/hospitalReducer";
const reducer = combineReducers({
  test: testReducer,
  user: userReducer,
  hospitals: hospitalReducer,
  allUsers: allUsersReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
