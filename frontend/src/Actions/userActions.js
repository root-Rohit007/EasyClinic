import {
  LOGIN_REQ,
  LOGIN_SUC,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../Constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQ });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v2/login",
      {
        email,
        password,
      },
      config
    );
    dispatch({ type: LOGIN_SUC, payload: data.user });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v2/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};
