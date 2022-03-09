import {
  GET_PATIENTS_REQ,
  GET_PATIENTS_SUC,
  GET_PATIENTS_FAIL,
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQ,
  PATIENT_DETAILS_SUC,
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

export const patientDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQ:
      return {
        ...state,
        loading: true,
      };

    case PATIENT_DETAILS_SUC:
      return {
        ...state,
        loading: false,
        patient: action.payload,
      };
    case PATIENT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
