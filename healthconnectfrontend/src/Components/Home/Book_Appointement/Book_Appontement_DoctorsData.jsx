import React, { useEffect, useState } from "react";
import StateData from "../../../Assets/states-and-districts.json";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";

const Book_Appontement_DoctorsData = () => {
  const [uniqueStates, setUniqueStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch unique states from backend
    const fetchUniqueStates = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-all-doc`
        ); // Adjust the URL as per your backend route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setUniqueStates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching unique states:", error);
      }
    };

    // Call the function to fetch unique states
    fetchUniqueStates();
  }, []);

  const navigate = useNavigate();
  const handleClickChange = (name) => {
    // setState(name);
    navigate("/");
  };

  return (
    <div className="h-[73vh] flex flex-col items-center">
      <div className="text-2xl text-center mb-4">Select State</div>
      <div className="w-full max-w-[90%]">
        {loading ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <SpinningCircles color="#4299e1" fill="#4299e1" />
          </div>
        ) : (
          uniqueStates.map((name) => (
            <button
              onClick={() => handleClickChange(name)}
              className="w-full text-center my-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white"
            >
              {name.name + " (" + name.speciality + ")"}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Book_Appontement_DoctorsData;
