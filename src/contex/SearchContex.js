import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [search, setsearch] = useState({
   keyword:"",
   results:[]
  });

  //default axios
  
  return (
    <SearchContext.Provider value={[search, setsearch]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };