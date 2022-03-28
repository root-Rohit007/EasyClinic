import { REGISTER_PATIENTS_SUC } from "Constants/patientConstant";
import { REGISTER_PATIENTS_FAIL } from "Constants/patientConstant";
import { REGISTER_PATIENTS_REQ } from "Constants/patientConstant";
import {
  GET_PATIENTS_REQ,
  GET_PATIENTS_SUC,
  GET_PATIENTS_FAIL,
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQ,
  PATIENT_DETAILS_SUC,
  REGISTER_PATIENTS_RESET,
  CLEAR_ERRORS,
  UPDATE_PATIENT_FAIL,
  UPDATE_PATIENT_REQ,
  UPDATE_PATIENT_SUC,
  UPDATE_PATIENT_RESET,
} from "Constants/patientConstant";

export const registerPatientsReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case REGISTER_PATIENTS_REQ:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_PATIENTS_SUC:
      return {
        ...state,
        loading: false,
        patient: action.payload,
      };

    case REGISTER_PATIENTS_FAIL:
      return {
        ...state,
        loading: false,
        patient: null,
        error: action.payload,
      };

    case REGISTER_PATIENTS_RESET:
      return {
        ...state,
        patient: null,
        laoding: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

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

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const patientDetailsReducer = (state = { patient: {} }, action) => {
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

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return { ...state };
  }
};

export const patientProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PATIENT_REQ:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PATIENT_SUC:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case UPDATE_PATIENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PATIENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
