import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { testReducer } from "./Reducers/testReducers";
import {
  allUsersReducer,
  userReducer,
  userDetailsReducer,
} from "./Reducers/userReducers";
import { hospitalReducer } from "./Reducers/hospitalReducer";
import { allPatientsReducer } from "./Reducers/patientsReducer";
const reducer = combineReducers({
  test: testReducer,
  user: userReducer,
  hospitals: hospitalReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  patientDetails: allPatientsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
