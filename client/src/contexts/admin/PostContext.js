import { createContext, useReducer } from "react";
import axios from "axios";
import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  UPDATE_POST,
  DELETE_POST,
} from "../constants";
import { postReducer } from "../../reducers/admin/postReducer";

export const AdminPostContext = createContext();

const AdminPostContextProvider = ({ children }) => {
  const [adminPostState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
  });

  // Get posts
  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/posts`);
      // console.log(response);
      if (response.data.success) {
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
  };

  // Get a post 
  const getPost = async (postId) => {
    try {
      const response = await axios.get(`${apiUrl}/admin/posts/${postId}`);

      if (response.data.success)
        return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }

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
  const rejectPost = async (postId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/posts/reject/${postId}`
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

  // Context data
  const adminPostContextData = {
    adminPostState,
    getAllPosts,
    getPost,
    acceptPost,
    rejectPost,
    deletePost,
  };

  // Return provider
  return (
    <AdminPostContext.Provider value={adminPostContextData}>
      {children}
    </AdminPostContext.Provider>
  );
};

export default AdminPostContextProvider;
