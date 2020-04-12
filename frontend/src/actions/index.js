import { AUTH_USER } from "./types";

export const signup = (username, password) => async (dispatch) => {
  const data = JSON.stringify({ username, password });

  console.log(data);

  const response = await fetch("http://localhost:3090/signup", {
    method: "POST",
  });
};
