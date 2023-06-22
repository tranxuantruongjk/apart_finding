import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  apiUrl,
  apiPyUrl,
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

  const [rentTypes, setRentTypes] = useState([]);

  const { page, limit } = postState;

  // Get all rent types
  const getRentTypes = async () => {
    const response = await axios.get(`${apiUrl}/posts/rentTypes`);
    setRentTypes(response.data.rentTypes);
  };

  useEffect(() => {
    getRentTypes();
  }, []);

  // Get posts's count by type
  const getPostsCountByType = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/postsCountByType`);
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
            },
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
            },
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
          },
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

  // Get post(s) which a user saved
  const getSavedPosts = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/${userId}/savedPosts`);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Get post(s) recommend
  const getRecommendPosts = async (postId) => {
    try {
      const response = await axios.get(`${apiPyUrl}/posts/${postId}`);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Context data
  const postContextData = {
    postState,
    rentTypes,
    getPosts,
    createPost,
    searchPost,
    getUserIdPosts,
    changePage,
    getPostsCountByType,
    getSavedPosts,
    getRecommendPosts,
  };

  // Return provider
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
