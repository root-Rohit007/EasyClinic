import { UPDATE_PROFILE_SUCCESS } from "Constants/userConstants";
import {
  GET_HOSPITAL_FAIL,
  GET_HOSPITAL_REQ,
  GET_HOSPITAL_SUC,
  CREATE_HOSPITAL_FAIL,
  CREATE_HOSPITAL_REQ,
  CREATE_HOSPITAL_SUC,
  CLEAR_ERRORS,
  CREATE_HOSPITAL_RESET,
  HOSPITAL_DETAILS_REQ,
  HOSPITAL_DETAILS_SUC,
  HOSPITAL_DETAILS_FAIL,
  UPDATE_HOSPITAL_FAIL,
  UPDATE_HOSPITAL_RESET,
  UPDATE_HOSPITAL_SUC,
  UPDATE_HOSPITAL_REQ,
} from "../Constants/hospitalConstant";

export const hospitalReducer = (state = { hospitals: [] }, action) => {
  switch (action.type) {
    case GET_HOSPITAL_REQ:
      return {
        loading: true,
        hospitals: [],
      };

    case GET_HOSPITAL_SUC:
      return {
        loading: false,
        hospitals: action.payload,
      };

    case GET_HOSPITAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const hospitalDetailsReducers = (state = { hospital: {} }, action) => {
  switch (action.type) {
    case HOSPITAL_DETAILS_REQ:
      return {
        ...state,
        loading: true,
      };

    case HOSPITAL_DETAILS_SUC:
      return {
        ...state,
        loading: false,
        hospital: action.payload,
      };

    case HOSPITAL_DETAILS_FAIL:
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

export const registerHospitalReducer = (state = { hospital: {} }, action) => {
  switch (action.type) {
    case CREATE_HOSPITAL_REQ:
      return {
        ...state,
        loadingHospital: true,
      };

    case CREATE_HOSPITAL_SUC:
      return {
        ...state,
        loadingHospital: false,
        hospital: action.payload,
      };

    case CREATE_HOSPITAL_RESET:
      return {
        ...state,
        loadingHospital: false,
        hospital: null,
      };

    case CREATE_HOSPITAL_FAIL:
      return {
        ...state,
        hospital: null,
        loadingHospital: false,
        errorHospital: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errorHospital: null,
      };

    default:
      return state;
  }
};

export const updateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_HOSPITAL_REQ:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_HOSPITAL_SUC:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case UPDATE_HOSPITAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_HOSPITAL_RESET:
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
