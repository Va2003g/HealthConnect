import React, { useEffect, useState } from "react";
import StateData from "../../../Assets/states-and-districts.json";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

const Book_Appointement_State_Data = () => {
  const { setState } = useContext(AppContext);
  const [uniqueStates, setUniqueStates] = useState([]);

  useEffect(() => {
    // Function to fetch unique states from backend
    const fetchUniqueStates = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-state`
        ); // Adjust the URL as per your backend route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // console.log(data);
        setUniqueStates(data);
      } catch (error) {
        console.error("Error fetching unique states:", error);
      }
    };

    // Call the function to fetch unique states
    fetchUniqueStates();
  }, []);

  const navigate = useNavigate();
  const handleClickChange = (name) => {
    setState(name);
    navigate("/Book_Appointement_District");
  };

  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select State</div>
      <div>
        {uniqueStates.map((name) => (
          <button
            onClick={() => handleClickChange(name)}
            className="w-[47%] text-centre m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Book_Appointement_State_Data;
