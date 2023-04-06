import { createContext, useReducer } from "react";
import axios from "axios";
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  POSTS_SEARCHED_SUCCESS,
  POSTS_SEARCHED_FAIL,
} from "./constants";
import { postReducer } from "../reducers/postReducer";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
  });

  // Get all posts
  const getPosts = async (type) => {
    if (type) {
      try {
        const response = await axios.get(`${apiUrl}/post/${type}`);
        if (response.data.success) {
          // console.log(response.data.posts);
          dispatch({
            type: POSTS_LOADED_SUCCESS,
            payload: response.data.posts,
          });
        }
      } catch (error) {
        dispatch({
          type: POSTS_LOADED_FAIL,
        });
      }
    } else {
      try {
        const response = await axios.get(`${apiUrl}/post`);
        if (response.data.success) {
          // console.log(response.data.posts);
          dispatch({
            type: POSTS_LOADED_SUCCESS,
            payload: response.data.posts,
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
    for (const [key, value] of postForm) {
      console.log(`${key}: ${value}\n`);
    }
    try {
      const response = await axios.post(`${apiUrl}/post`, postForm, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
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
      const response = await axios.post(`${apiUrl}/post/search`, searchForm);
      if (response.data.success) {
        dispatch({
          type: POSTS_SEARCHED_SUCCESS,
          payload: response.data.posts,
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
      const response = await axios.get(`${apiUrl}/post/${userId}/posts`);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }

  // Context data
  const postContextData = { postState, getPosts, createPost, searchPost, getUserIdPosts };

  // Return provider
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
