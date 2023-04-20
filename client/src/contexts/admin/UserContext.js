import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { apiUrl, USERS_LOADED_SUCCESS, USERS_LOADED_FAILED } from "../constants";
import { userReducer } from "../../reducers/admin/userReducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    userLoading: true,
    users: [],
  });

  // Get all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/admin/usersList`);

      if (response.data.success) {
        dispatch({
          type: USERS_LOADED_SUCCESS,
          payload: response.data.users,
        })
      }
    } catch (error) {
      dispatch({
        type: USERS_LOADED_FAILED,
      })
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
      const response = await axios.put(
        `${apiUrl}/auth/admin/usersList/block/${userId}`
      );

      await getAllUsers();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const unBlockUser = async (userId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/auth/admin/usersList/unblock/${userId}`
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
      const response = await axios.delete(
        `${apiUrl}/auth/admin/usersList/delete/${userId}`
      );

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
    unBlockUser,
    deleteUser,
  };

  // Return provider
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;