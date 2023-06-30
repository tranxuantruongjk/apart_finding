import { createContext, useReducer, useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";
import { io } from "socket.io-client";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const { user } = authState;

  // Authenticate
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);

      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
      return response.data;
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  //
  useEffect(() => {
    loadUser();
  }, []);

  //
  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  //
  useEffect(() => {
    user && socket?.emit("addUser", user._id);
  }, [socket, user]);

  // console.log(user);

  // Get information of a user
  const getUser = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/auth/${id}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // User logins
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      const res = await loadUser();
      return { ...response.data, user: res.user };
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // User registers
  const registerUser = async (registerForm, role = "user") => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        registerForm
      );
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Update user's info
  const updateUserInfo = async (userId, updateForm) => {
    try {
      const response = await axios.put(`${apiUrl}/auth/${userId}`, updateForm);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // User exits
  const logoutUser = async () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);

    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  // Get notification
  const getNotifications = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/notifications/${userId}`);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Change notification's status to seen
  const updateNotification = async (notificationId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/notifications/${notificationId}`
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
  const authContextData = {
    authState,
    loginUser,
    registerUser,
    logoutUser,
    getUser,
    updateUserInfo,
    getNotifications,
    socket,
    notifications,
    setNotifications,
    updateNotification,
  };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
