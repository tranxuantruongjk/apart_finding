import { createContext, useReducer } from "react";
import axios from "axios";
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  POSTS_SEARCHED_SUCCESS,
  POSTS_SEARCHED_FAIL,
  CHANGE_PAGE,
} from "./constants";
import { postReducer } from "../reducers/postReducer";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
    page: 1,
    limit: 5,
    total: 0,
  });

  const { page, limit } = postState;

  // Get total of posts
  const getTotalPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/postsCount`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Change page
  const changePage = async (pageCurrent) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: pageCurrent,
    });
  };

  // Get all posts
  const getPosts = async (type) => {
    if (type) {
      try {
        const response = await axios.get(
          `${apiUrl}/posts/${type}?page=${page}&limit=${limit}`
        );
        if (response.data.success) {
          dispatch({
            type: POSTS_LOADED_SUCCESS,
            payload: {
              posts: response.data.posts,
              total: response.data.total,
            }
          });
        }
      } catch (error) {
        dispatch({
          type: POSTS_LOADED_FAIL,
        });
      }
    } else {
      try {
        const response = await axios.get(
          `${apiUrl}/posts?page=${page}&limit=${limit}`
        );
        if (response.data.success) {
          dispatch({
            type: POSTS_LOADED_SUCCESS,
            payload: {
              posts: response.data.posts,
              total: response.data.total,
            }
          });
        }
      } catch (error) {
        dispatch({
          type: POSTS_LOADED_FAIL,
        });
      }
    }
  };

  // Create a new post
  const createPost = async (postForm) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, postForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Search post(s)
  const searchPost = async (searchForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/posts/search?page=${page}&limit=${limit}`,
        searchForm
      );
      if (response.data.success) {
        dispatch({
          type: POSTS_SEARCHED_SUCCESS,
          payload: {
            posts: response.data.posts,
            total: response.data.total,
          }
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_SEARCHED_FAIL,
      });
    }
  };

  // Get post(s) which a user posted
  const getUserIdPosts = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/${userId}/posts`);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Context data
  const postContextData = {
    postState,
    getPosts,
    createPost,
    searchPost,
    getUserIdPosts,
    changePage,
    getTotalPosts,
  };

  // Return provider
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
