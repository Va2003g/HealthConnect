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
  );
  const [mode, setMode] = useState(localStorage.getItem("mode") || "");

  // Add Doctor state and setter
  const [doctor, setDoctor] = useState(localStorage.getItem("doctor") || "");

  const [doctorDate, setDoctorDate] = useState(
    localStorage.getItem("doctorDate") || ""
  );

  const [Uid, setUid] = useState(localStorage.getItem("Uid") || "");
  const [role,setRole] = useState(localStorage.getItem("role") || "");

  // data for appointment
  const [appointmentData, setAppointmentData] = useState({
    type: "",
    patientEmail: "",
    hospitalName: "",
    state: "",
    district: "",
    departmentName: "",
    date: "",
  });
  useEffect(() => {
    // Update local storage based on state changes
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("state", state);
    localStorage.setItem("district", district);
    localStorage.setItem("name", name);
    localStorage.setItem("hospital", hospital);
    localStorage.setItem("mode", mode);
    localStorage.setItem("doctor", doctor);
    localStorage.setItem("doctorDate", doctorDate);
    localStorage.setItem("Uid", Uid);
    localStorage.setItem("role", role);
  }, [
    isLoggedIn,
    state,
    district,
    name,
    hospital,
    mode,
    doctor,
    doctorDate,
    Uid,
    role,
  ]);

  // Function to set and update expiration timestamp
  const setAndCheckExpiration = (newValue) => {
    setIsLoggedIn(newValue);
    localStorage.setItem("isLoggedIn", newValue);
    localStorage.setItem(
      "isLoggedInExpiration",
      Date.now() + 24 * 60 * 60 * 1000
    );
  };

  // Check for expired login on component mount
  useEffect(() => {
    const storedExpiration = localStorage.getItem("isLoggedInExpiration");
    if (storedExpiration && parseInt(storedExpiration) < Date.now()) {
      setAndCheckExpiration(false);
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
        setMode,
        // Include Doctor state and setter in the context value
        doctor,
        setDoctor,
        doctorDate, // Include doctorDate in the context value
        setDoctorDate, // Include setDoctorDate in the context value
        Uid,
        setUid,
        setMode, // Add mode and setMode to context value
        appointmentData,
        setAppointmentData,
        role,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
