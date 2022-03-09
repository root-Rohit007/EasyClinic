import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { testReducer } from "./Reducers/testReducers";
import {
  allUsersReducer,
  userReducer,
  userDetailsReducer,
  registerUserReducer,
} from "./Reducers/userReducers";
import {
  hospitalReducer,
  registerHospitalReducer,
} from "./Reducers/hospitalReducer";
import {
  allPatientsReducer,
  patientDetailsReducer,
} from "./Reducers/patientsReducer";
const reducer = combineReducers({
  test: testReducer,
  user: userReducer,
  hospitals: hospitalReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  patientDetails: allPatientsReducer,
  patientProfile: patientDetailsReducer,
  registerUser: registerUserReducer,
  registerHospital: registerHospitalReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
