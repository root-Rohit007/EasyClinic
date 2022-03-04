import { TEST_SUC, TEST_REQ, TEST_FAIL } from "../Constants/testConstants";
export const testReducer = (state = { test: [] }, action) => {
  switch (action.type) {
    case TEST_REQ:
      return {
        loading: true,
        test: [],
      };

    case TEST_SUC:
      return {
        loading: false,
        test: action.payload,
      };

    case TEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
