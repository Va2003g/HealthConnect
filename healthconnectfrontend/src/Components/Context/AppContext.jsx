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

  // Add mode and setMode
  const [mode, setMode] = useState(
    localStorage.getItem("mode") || "" // Initialize with stored mode or empty string
  );

  useEffect(() => {
    // Update local storage based on state changes
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("state", state);
    localStorage.setItem("district", district);
    localStorage.setItem("name", name);
    localStorage.setItem("hospital", JSON.stringify(hospital)); // Store hospital as JSON

    // Update local storage with mode
    localStorage.setItem("mode", mode);
  }, [isLoggedIn, state, district, name, hospital, mode]); // Add mode to dependency array

  // Function to set and update expiration timestamp
  const setAndCheckExpiration = (newValue) => {
    setIsLoggedIn(newValue);
    localStorage.setItem("isLoggedIn", newValue);
    localStorage.setItem(
      "isLoggedInExpiration",
      Date.now() + 24 * 60 * 60 * 1000
    ); // Set expiration 24 hours from now
  };

  // Check for expired login on component mount
  useEffect(() => {
    const storedExpiration = localStorage.getItem("isLoggedInExpiration");
    if (storedExpiration && parseInt(storedExpiration) < Date.now()) {
      setAndCheckExpiration(false); // Set isLoggedIn to false if expired
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setAndCheckExpiration,
        state,
        setState,
        district,
        setDistrict,
        name,
        setName,
        hospital,
        setHospital,
        mode,
        setMode, // Add mode and setMode to context value
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
