import {
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  CHANGE_PAGE,
  CHANGE_LIMIT,
  CHANGE_FILTER,
} from "../../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PAGE: {
      return {
        ...state,
        page: payload,
      };
    }
    case CHANGE_LIMIT: {
      return {
        ...state,
        limit: payload,
      };
    }
    case CHANGE_FILTER: {
      return {
        ...state,
        filter: payload,
      };
    }
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
        postLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload._id),
      };
    case UPDATE_POST:
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      return {
        ...state,
        posts: newPosts,
      };
    default: {
      return state;
    }
  }
};
