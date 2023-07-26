import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  apiUrl,
  POSTS_SEARCHED_SUCCESS,
  POSTS_SEARCHED_FAIL,
  CHANGE_PAGE,
} from "./constants";
import { postReducer } from "../reducers/postReducer";

export const SearchContext = createContext({});

const minPrice = 0;
const maxPrice = 10;
const minAcreage = 0;
const maxAcreage = 50;

const SearchProvider = ({ children }) => {
  const [resultState, dispatch] = useReducer(postReducer, {
    postLoading: true,
    posts: [],
    page: 1,
    limit: 10,
    total: 0,
  });

  const title = {
    0: "Chọn Quận/Huyện",
    1: "Chọn Phường/Xã",
  };

  const [addressPage, setAddressPage] = useState(0);
  const [addressState, setAddressState] = useState({
    district: "000",
    districtName: "",
    ward: "00000",
    wardName: "",
    address: "",
  });

  const [searchState, setSearchState] = useState({
    rentType: {},
    minPriceVal: minPrice,
    maxPriceVal: maxPrice,
    minAcreageVal: minAcreage,
    maxAcreageVal: maxAcreage,
    utils: [],
    gender: "any",
  });

  const [displayAddressModal, setDisplayAddressModal] = useState(false);

  const { page, limit } = resultState;

  const changePage = async (pageCurrent) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: pageCurrent,
    });
  };

  const showAddressModal = () => {
    setDisplayAddressModal(true);
  };

  const hideAddressModal = () => {
    setDisplayAddressModal(false);
  };

  const changeSearchState = (state, value) => {
    setSearchState((prevData) => ({
      ...prevData,
      [state]: value,
    }));
  };

  const handleChangeAllDistricts = (e) => {
    setAddressState({
      district: "000",
      districtName: "",
      ward: "00000",
      wardName: "",
      address: "",
    });
  };

  const handleChangeDistrict = (e) => {
    setAddressState({
      district: e.target.id,
      districtName: e.target.nextSibling.innerText,
      address: e.target.nextSibling.innerText,
      ward: "00000",
      wardName: "",
    });

    setAddressPage((prev) => prev + 1);
  };

  const handleChangeAllWards = (e) => {
    setAddressState((prevData) => ({
      ...prevData,
      ward: e.target.id,
      wardName: "",
      address: addressState.districtName,
    }));
    hideAddressModal();
  };

  const handleChangeWard = (e) => {
    setAddressState((prevData) => ({
      ...prevData,
      ward: e.target.id,
      wardName: e.target.nextSibling.innerText,
      address: `${e.target.nextSibling.innerText}, ${addressState.districtName}`,
    }));
    hideAddressModal();
  };

  // Search post(s)
  const searchPost = async (searchForm, initPage = 0) => {
    try {
      const response = await axios.post(
        `${apiUrl}/posts/search?page=${initPage !== 0 ? initPage : page}&limit=${limit}`,
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

  const searchValue = {
    title,
    resultState,
    addressState,
    setAddressState,
    addressPage,
    setAddressPage,
    handleChangeDistrict,
    handleChangeWard,
    handleChangeAllDistricts,
    handleChangeAllWards,
    displayAddressModal,
    showAddressModal,
    hideAddressModal,
    searchState,
    setSearchState,
    changeSearchState,
    minPrice,
    maxPrice,
    minAcreage,
    maxAcreage,
    changePage,
    searchPost,
  };

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
