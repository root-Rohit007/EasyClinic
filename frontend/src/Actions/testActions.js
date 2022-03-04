import axios from "axios";

import { TEST_REQ, TEST_FAIL, TEST_SUC } from "../Constants/testConstants";

export const getTest = () => async (dispatch) => {
  try {
    dispatch({
      type: TEST_REQ,
    });

    const { data } = await axios.get("/api/v1/test");

    dispatch({
      type: TEST_SUC,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
