import { createContext, useState } from "react";

export const SearchContext = createContext({});

const minPrice = 0;
const maxPrice = 10;
const minAcreage = 0;
const maxAcreage = 50;

const SearchProvider = ({children}) => {
  const title = {
    0: "Chọn Quận/Huyện",
    1: "Chọn Phường/Xã"
  };

  const [page, setPage] = useState(0);
  const [addressState, setAddressState] = useState({
    district: "000",
    districtName: "",
    ward: "00000",
    wardName: "",
    address: ""    
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

  const showAddressModal = () => {
    setDisplayAddressModal(true);
  };

  const hideAddressModal = () => {
    setDisplayAddressModal(false);
  }

  const changeSearchState = (state, value) => {
    setSearchState((prevData) => ({
      ...prevData,
      [state]: value,
    }));
  }

  const handleChangeAllDistricts = (e) => {
    setAddressState({
      district: "000",
      districtName: "",
      ward: "00000",
      wardName: "",
      address: ""  
    });
  }

  const handleChangeDistrict = (e) => {
    setAddressState({
      district: e.target.id,
      districtName: e.target.nextSibling.innerText,
      address: e.target.nextSibling.innerText,
      ward: "00000",
      wardName: ""
    });
    
    setPage((prev) => prev + 1);
  }

  const handleChangeAllWards = (e) => {
    setAddressState((prevData) => ({
      ...prevData,
      ward: e.target.id,
      wardName: "",
      address: addressState.districtName,
    }));
    hideAddressModal();
  }

  const handleChangeWard = (e) => {
    setAddressState((prevData) => ({
      ...prevData,
      ward: e.target.id,
      wardName: e.target.nextSibling.innerText,
      address: `${e.target.nextSibling.innerText}, ${addressState.districtName}`
    }));
    hideAddressModal();
  }

  const searchValue = {
    title,
    addressState,
    setAddressState,
    page,
    setPage,
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
  };

  return (
    <SearchContext.Provider value={searchValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
