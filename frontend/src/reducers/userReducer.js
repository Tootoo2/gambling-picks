import { FETCH_USER } from "../actions/types";

const INITIAL_STATE = {
  _id: "",
  username: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...state,
        _id: action.payload._id,
        username: action.payload.username,
      };
    }
    default:
      return state;
  }
};
