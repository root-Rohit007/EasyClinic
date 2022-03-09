import {
  GET_HOSPITAL_FAIL,
  GET_HOSPITAL_REQ,
  GET_HOSPITAL_SUC,
  CREATE_HOSPITAL_FAIL,
  CREATE_HOSPITAL_REQ,
  CREATE_HOSPITAL_SUC,
  CLEAR_ERRORS,
  CREATE_HOSPITAL_RESET,
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
