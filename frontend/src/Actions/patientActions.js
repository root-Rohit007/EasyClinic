import axios from "axios";
import {
  GET_PATIENTS_REQ,
  GET_PATIENTS_SUC,
  GET_PATIENTS_FAIL,
  CLEAR_ERRORS,
} from "Constants/patientConstant";

export const getALLPatients = (hospitalID) => async (dispatch) => {
  try {
    dispatch({ type: GET_PATIENTS_REQ });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v4/getpatients`,
      {
        hospitalID,
      },
      config
    );
    dispatch({ type: GET_PATIENTS_SUC, payload: data.patients });
  } catch (error) {
    dispatch({
      type: GET_PATIENTS_FAIL,
      payload: error.error.response.data.message,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
