import axios from "axios";
import {
  GET_HOSPITAL_FAIL,
  GET_HOSPITAL_REQ,
  GET_HOSPITAL_SUC,
  CLEAR_ERRORS,
} from "../Constants/hospitalConstant";

export const getHospitals = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HOSPITAL_REQ });
    const { data } = await axios.get("/api/v3/SA/getHospital");
    console.log(data);
    dispatch({ type: GET_HOSPITAL_SUC, payload: data.hospitals });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({ type: GET_HOSPITAL_FAIL, payload: error.response.data.error });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
