import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

const useSearchContext = () => {
  return useContext(SearchContext);
}

export default useSearchContext;