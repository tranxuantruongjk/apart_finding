import { createContext, useReducer } from "react";
import axios from "axios";
import {
  apiUrl,
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAILED,
  CHANGE_PAGE,
  CHANGE_LIMIT,
} from "../constants";
import { userReducer } from "../../reducers/admin/userReducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    userLoading: true,
    users: [],
    page: 1,
    limit: 10,
    total: 0,
  });

  const { page, limit } = userState;

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

  // Get all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/admin/users?page=${page}&limit=${limit}`
      );
      if (response.data.success) {
        dispatch({
          type: USERS_LOADED_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: USERS_LOADED_FAILED,
      });
    }
  };

  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        registerForm
      );

      await getAllUsers();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const blockUser = async (userId) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/users/block/${userId}`);

      await getAllUsers();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const unblockUser = async (userId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/users/unblock/${userId}`
      );

      await getAllUsers();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/users/${userId}`);

      await getAllUsers();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Context data
  const userContextData = {
    userState,
    registerUser,
    blockUser,
    unblockUser,
    deleteUser,
    getAllUsers,
    changePage,
    changeLimit,
  };

  // Return provider
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
