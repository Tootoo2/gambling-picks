import { AUTH_USER, AUTH_FAIL } from "./types";

export const signup = (username, password) => async (dispatch) => {
  const response = await fetch("http://localhost:3090/signup", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return dispatch({ type: AUTH_FAIL, payload: "Email in use" });
  }
  const data = await response.json();
  dispatch({
    type: AUTH_USER,
    payload: data.token,
  });
  localStorage.setItem("token", data.token);
};
