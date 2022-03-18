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
  HOSPITAL_DETAILS_FAIL,
  HOSPITAL_DETAILS_REQ,
  HOSPITAL_DETAILS_SUC,
  UPDATE_HOSPITAL_FAIL,
  UPDATE_HOSPITAL_RESET,
  UPDATE_HOSPITAL_SUC,
  UPDATE_HOSPITAL_REQ,
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

export const getHospitalbyID = (id) => async (dispatch) => {
  try {
    dispatch({ type: HOSPITAL_DETAILS_REQ });
    const { data } = await axios.get(`/api/v3/SA/getHospital/${id}`);
    dispatch({ type: HOSPITAL_DETAILS_SUC, payload: data.hospital });
  } catch (error) {
    dispatch({
      type: HOSPITAL_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update hospital
export const updateHospital = (hospitalData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_HOSPITAL_REQ });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v3/SA/updateHospital/${id}`,
      hospitalData,
      config
    );
    dispatch({ type: UPDATE_HOSPITAL_SUC, payload: data.hospital });
  } catch (error) {
    dispatch({
      type: UPDATE_HOSPITAL_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Reset update hospital
export const resetUpdateHospital = () => async (dispatch) => {
  dispatch({ type: UPDATE_HOSPITAL_RESET });
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const resetHospital = () => async (dispatch) => {
  dispatch({ type: CREATE_HOSPITAL_RESET });
};
