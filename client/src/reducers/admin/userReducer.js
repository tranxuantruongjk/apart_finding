import {
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAILED,
  CHANGE_PAGE,
  CHANGE_LIMIT,
  CHANGE_FILTER,
} from "../../contexts/constants";

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: payload,
      };
    case CHANGE_LIMIT:
      return {
        ...state,
        limit: payload,
      };
    case CHANGE_FILTER:
      return {
        ...state,
        filter: payload,
      };
    case USERS_LOADED_SUCCESS:
      return {
        ...state,
        userLoading: false,
        users: payload.users,
        total: payload.total,
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
