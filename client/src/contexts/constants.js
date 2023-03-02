export const apiUrl = 
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "";

export const LOCAL_STORAGE_TOKEN_NAME = 'apart-finding';

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const POSTS_SEARCHED_SUCCESS = "POSTS_SEARCHED_SUCCESS";
export const POSTS_SEARCHED_FAIL = "POSTS_SEARCHED_FAIL";

export const PRICE_RANGE = [1, 2, 3, 5, 7, 10];
export const ACREAGE_RANGE = [20, 30, 50];