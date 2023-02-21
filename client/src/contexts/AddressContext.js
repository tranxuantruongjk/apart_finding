import { createContext, useState } from "react";

export const AddressContext = createContext({});

const AddressProvider = ({children}) => {
  const title = {
    0: "Chọn Quận/Huyện",
    1: "Chọn Phường/Xã"
  };

  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    district: "000",
    districtName: "",
    ward: "00000",
    wardName: "",
    address: ""    
  });

  const [displayAddressModal, setDisplayAddressModal] = useState(false);

  const showAddressModal = () => {
    setDisplayAddressModal(true);
  };

  const hideAddressModal = () => {
    setDisplayAddressModal(false);
  }

  const handleChangeAllDistricts = (e) => {
    setData({
      district: "000",
      districtName: "",
      ward: "00000",
      wardName: "",
      address: ""  
    });
  }

  const handleChangeDistrict = (e) => {
    setData({
      district: e.target.id,
      districtName: e.target.nextSibling.innerText,
      address: e.target.nextSibling.innerText,
      ward: "00000",
      wardName: ""
    });
    
    setPage((prev) => prev + 1);
  }

  const handleChangeAllWards = (e) => {
    setData((prevData) => ({
      ...prevData,
      ward: e.target.id,
      wardName: "",
      address: data.districtName,
    }));
    hideAddressModal();
  }

  const handleChangeWard = (e) => {
    setData((prevData) => ({
      ...prevData,
      ward: e.target.id,
      wardName: e.target.nextSibling.innerText,
      address: `${e.target.nextSibling.innerText}, ${data.districtName}`
    }));
    hideAddressModal();
  }

  const addressValue = {
    title,
    data,
    setData,
    page,
    setPage,
    handleChangeDistrict,
    handleChangeWard,
    handleChangeAllDistricts,
    handleChangeAllWards,
    displayAddressModal,
    showAddressModal,
    hideAddressModal,
  };

  return (
    <AddressContext.Provider value={addressValue}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;
