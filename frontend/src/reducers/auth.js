import { AUTH_USER, AUTH_FAIL } from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_FAIL:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
