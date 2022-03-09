import axios from "axios";
import {
  GET_HOSPITAL_FAIL,
  GET_HOSPITAL_REQ,
  GET_HOSPITAL_SUC,
  CREATE_HOSPITAL_FAIL,
  CREATE_HOSPITAL_SUC,
  CREATE_HOSPITAL_REQ,
  CLEAR_ERRORS,
  CREATE_HOSPITAL_RESET,
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

export const createHospital = (hospitalData) => async (dispatch) => {
  try {
    console.log(hospitalData);
    dispatch({ type: CREATE_HOSPITAL_REQ });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v3/SA/createHospital",
      hospitalData,
      config
    );
    dispatch({ type: CREATE_HOSPITAL_SUC, payload: data.hospital });
  } catch (error) {
    dispatch({
      type: CREATE_HOSPITAL_FAIL,
      payload: error.response.data.error,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const resetHospital = () => async (dispatch) => {
  dispatch({ type: CREATE_HOSPITAL_RESET });
};
