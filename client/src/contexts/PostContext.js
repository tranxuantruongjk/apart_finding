import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { apiUrl, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS } from "./constants";
import { postReducer } from "../reducers/postReducer";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
  });

  //
  const { getUser } = useContext(AuthContext);

  // Get all posts
  const getPosts = async () => {
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

  // Context data
  const postContextData = { postState, getPosts };

  // Return provider 
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;