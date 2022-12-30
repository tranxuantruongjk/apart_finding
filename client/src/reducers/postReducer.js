import { POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS } from "../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case POSTS_LOADED_FAIL: 
      return {
        ...state,
        posts: [],
        postLoading: true,
      }
    default: {
      return state;
    }
  }
}