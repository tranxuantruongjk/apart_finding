import {
  CHANGE_PAGE,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  POSTS_SEARCHED_FAIL,
  POSTS_SEARCHED_SUCCESS,
} from "../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: payload,
      };
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload.posts,
        total: payload.total,
        postLoading: false,
      };
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: true,
      };
    case POSTS_SEARCHED_SUCCESS:
      return {
        ...state,
        posts: payload.posts,
        total: payload.total,
        postLoading: false,
      };
    case POSTS_SEARCHED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: true,
      };
    default: {
      return state;
    }
  }
};
