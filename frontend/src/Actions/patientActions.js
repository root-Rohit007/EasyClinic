import axios from "axios";
import { UPDATE_PATIENT_SUC } from "Constants/patientConstant";
import { UPDATE_PATIENT_RESET } from "Constants/patientConstant";
import { UPDATE_PATIENT_FAIL } from "Constants/patientConstant";
import { UPDATE_PATIENT_REQ } from "Constants/patientConstant";
import { REGISTER_PATIENTS_RESET } from "Constants/patientConstant";
import {
  GET_PATIENTS_REQ,
  GET_PATIENTS_SUC,
  GET_PATIENTS_FAIL,
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQ,
  PATIENT_DETAILS_SUC,
  REGISTER_PATIENTS_REQ,
  REGISTER_PATIENTS_SUC,
  REGISTER_PATIENTS_FAIL,
  CLEAR_ERRORS,
} from "Constants/patientConstant";

// Register Patients
export const registerPatients = (patientsData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_PATIENTS_REQ });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v4/createpatient`,
      patientsData,
      config
    );
    dispatch({ type: REGISTER_PATIENTS_SUC, payload: data.patient });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: REGISTER_PATIENTS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const resetPatient = () => async (dispatch) => {
  dispatch({ type: REGISTER_PATIENTS_RESET });
};

export const updatePatient = (patientData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PATIENT_REQ });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v4/patient/${id}`,
      patientData,
      config
    );
    dispatch({ type: UPDATE_PATIENT_SUC, payload: data.patient });
  } catch (err) {
    dispatch({
      type: UPDATE_PATIENT_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const resetUpdatePatient = () => async (dispatch) => {
  dispatch({ type: UPDATE_PATIENT_RESET });
};

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

export const getPatientsDetail = (id) => async (dispatch) => {
  try {
    console.log("hit");
    dispatch({ type: PATIENT_DETAILS_REQ });
    const { data } = await axios.get(`/api/v4/patient/${id}`);
    dispatch({ type: PATIENT_DETAILS_SUC, payload: data.patient });
  } catch (error) {
    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
