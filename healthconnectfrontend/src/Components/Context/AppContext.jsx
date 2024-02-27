import { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, setState] = useState("");
  const [district , setDistrict] = useState("");

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    state,
    setState,
    district,
    setDistrict
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContextProvider };
