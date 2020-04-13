import { AUTH_USER, AUTH_FAIL, USER_SIGNOUT } from "./types";

export const signup = (username, password) => async (dispatch) => {
  const response = await fetch("http://localhost:3090/signup", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    return dispatch({ type: AUTH_FAIL, payload: data.error });
  }
  const data = await response.json();
  dispatch({
    type: AUTH_USER,
    payload: data.token,
  });
  localStorage.setItem("token", data.token);
};
export const signin = (username, password) => async (dispatch) => {
  const response = await fetch("http://localhost:3090/signin", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return dispatch({ type: AUTH_FAIL, payload: "Invalid credentials" });
  }
  const data = await response.json();
  dispatch({
    type: AUTH_USER,
    payload: data.token,
  });
  localStorage.setItem("token", data.token);
};

export const signout = () => {
  localStorage.removeItem("token");
  return { type: USER_SIGNOUT };
};
