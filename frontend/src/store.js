import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { testReducer } from "./Reducers/testReducers";
import {
  allUsersReducer,
  userReducer,
  userDetailsReducer,
  registerUserReducer,
  profileReducer,
} from "./Reducers/userReducers";
import {
  hospitalReducer,
  registerHospitalReducer,
  hospitalDetailsReducers,
  updateReducer,
} from "./Reducers/hospitalReducer";
import {
  allPatientsReducer,
  patientDetailsReducer,
  patientProfileReducer,
  registerPatientsReducer,
} from "./Reducers/patientsReducer";
const reducer = combineReducers({
  test: testReducer,
  user: userReducer,
  hospitals: hospitalReducer,
  hospitalDetails: hospitalDetailsReducers,
  hospitalEdits: updateReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  patientDetails: allPatientsReducer,
  patientProfile: patientDetailsReducer,
  registerUser: registerUserReducer,
  registerHospital: registerHospitalReducer,
  profileUpdate: profileReducer,
  registerPatients: registerPatientsReducer,
  patientUpdate: patientProfileReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
