import { createContext, useReducer, useState } from "react";
import axios from "axios";
import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  UPDATE_POST,
  DELETE_POST,
  CHANGE_PAGE,
  CHANGE_LIMIT,
  CHANGE_FILTER,
} from "../constants";
import { postReducer } from "../../reducers/admin/postReducer";

export const AdminPostContext = createContext();

const AdminPostContextProvider = ({ children }) => {
  const [adminPostState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
    page: 1,
    limit: 10,
    filter: "all",
    total: 0,
  });

  const [rentTypes, setRentTypes] = useState([]);

  const { page, limit, filter } = adminPostState;

  // Change page
  const changePage = async (pageCurrent) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: pageCurrent,
    });
  };

  // Change limit
  const changeLimit = async (pageSize) => {
    dispatch({
      type: CHANGE_LIMIT,
      payload: pageSize,
    });
  };

  // Change filter
  const changeFilter = async (filter) => {
    dispatch({
      type: CHANGE_FILTER,
      payload: filter,
    });
  };

  // Get posts's count by type
  const getPostsCountByType = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/postsCountByType`);
      if (response.data.success) {
        setRentTypes(response.data.rentTypes);
        // return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Get all rent types
  const getRentTypes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts/rentTypes`);
      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Get posts
  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/admin/posts?filter=${filter}&page=${page}&limit=${limit}`
      );
      // console.log(response);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: POSTS_LOADED_FAIL,
      });
    }
  };

  // Add rent type
  const addRentType = async (newType) => {
    try {
      const response = await axios.post(`${apiUrl}/admin/types`, newType);

      await getPostsCountByType();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Update rent type
  const updateRentType = async (updatedType) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/types/${updatedType._id}`,
        updatedType
      );

      await getPostsCountByType();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // Get a post
  const getPost = async (postId) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/${postId}`);

      if (response.data.success) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Accept a post
  const acceptPost = async (postId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/posts/accept/${postId}`
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: response.data.post,
        });
      }
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: error.message };
    }
  };

  // Accept a post
  const rejectPost = async (postId, reason) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/posts/reject/${postId}`,
        { reason }
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: response.data.post,
        });
      }
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: error.message };
    }
  };

  // Hide a post
  const hidePost = async (postId) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/posts/hide/${postId}`);
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: response.data.post,
        });
      }
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: error.message };
    }
  };

  // Activate a post
  const activatePost = async (postId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/posts/active/${postId}`
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: response.data.post,
        });
      }
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: error.message };
    }
  };

  // Accept a post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/posts/${postId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: response.data.post,
        });
      }
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: error.message };
    }
  };

  // Send notification
  const sendNotification = async (notificationForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/notifications`,
        notificationForm
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: error.message };
    }
  };

  const statisticPost = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/posts/statistic`);
      if (response.data.success) return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: error.message };
    }
  };

  // Context data
  const adminPostContextData = {
    adminPostState,
    rentTypes,
    getAllPosts,
    getPost,
    acceptPost,
    rejectPost,
    deletePost,
    addRentType,
    updateRentType,
    changePage,
    changeLimit,
    changeFilter,
    getPostsCountByType,
    sendNotification,
    statisticPost,
    getRentTypes,
    hidePost,
    activatePost,
  };

  // Return provider
  return (
    <AdminPostContext.Provider value={adminPostContextData}>
      {children}
    </AdminPostContext.Provider>
  );
};

export default AdminPostContextProvider;
