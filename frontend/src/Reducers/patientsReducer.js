import {
  GET_PATIENTS_REQ,
  GET_PATIENTS_SUC,
  GET_PATIENTS_FAIL,
} from "Constants/patientConstant";

export const allPatientsReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_PATIENTS_REQ:
      return {
        ...state,
        loading: true,
      };

    case GET_PATIENTS_SUC:
      return {
        ...state,
        loading: false,
        patients: action.payload,
      };

    case GET_PATIENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
