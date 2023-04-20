import {
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAILED,
} from "../../contexts/constants";

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USERS_LOADED_SUCCESS:
      return {
        ...state,
        userLoading: false,
        users: payload,
      };
    case USERS_LOADED_FAILED:
      return {
        ...state,
        userLoading: true,
        users: [],
      };
    default: {
      return state;
    }
  }
};
