import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? true : false
  );
  const [state, setState] = useState(localStorage.getItem("state") || "");
  const [district, setDistrict] = useState(
    localStorage.getItem("district") || ""
  );
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [hospital, setHospital] = useState(
    localStorage.getItem("hospital") || ""
  ); // Parsed JSON

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("state", state);
    localStorage.setItem("district", district);
    localStorage.setItem("name", name);
    localStorage.setItem("hospital", JSON.stringify(hospital)); // Store hospital as JSON
  }, [isLoggedIn, state, district, name, hospital]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        state,
        setState,
        district,
        setDistrict,
        name,
        setName,
        hospital,
        setHospital,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
