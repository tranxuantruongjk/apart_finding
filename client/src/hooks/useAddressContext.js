import { useContext } from "react";
import { AddressContext } from "../contexts/AddressContext";

const useAddressContext = () => {
  return useContext(AddressContext);
}

export default useAddressContext;