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
    limit: 10,
    total: 0,
  });

  const [rentTypes, setRentTypes] = useState([]);

  const { page, limit } = postState;

  // Get all rent types
  const getRentTypes = async () => {
    const response = await axios.get(`${apiUrl}/posts/rentTypes`);
    setRentTypes(response.data.rentTypes);
  };

  // Execute to get all rent types
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
          `${apiUrl}/posts/type/${type}?page=${page}&limit=${limit}`
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

  // Get detail post
  const getDetailPost = async (postId) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/${postId}`);
      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Update/Edit a post
  const updatePost = async (postId, updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${postId}`,
        updatedPost
      );
      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Get admin role
  const getAdminRole = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/roleAdmin`);
      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Send notifications
  const sendNotification = async (notificationForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/notifications`,
        notificationForm
      );
      if (response.data.success) {
        return response.data;
      }
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
    getUserIdPosts,
    changePage,
    getPostsCountByType,
    getSavedPosts,
    getRecommendPosts,
    getDetailPost,
    updatePost,
    deletePost,
    getAdminRole,
    sendNotification,
  };

  // Return provider
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
