import {
  GET_HOSPITAL_FAIL,
  GET_HOSPITAL_REQ,
  GET_HOSPITAL_SUC,
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
