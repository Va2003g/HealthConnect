import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Book_Appointement_District_Data = () => {
  const { state, setDistrict } = useContext(AppContext);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);

  const fetchDistricts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-district?state=${state}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching districts: ${response.status}`);
      }

      const data = await response.json();

      // Check for presence of uniqueDistricts before accessing it
      if (data && data.Data && data.Data.uniqueDistricts) {
        setUniqueDistricts(data.Data.uniqueDistricts);
      } else {
        // Handle the case where uniqueDistricts is not present in the response
        console.error(
          'Error: "uniqueDistricts" property not found in response data'
        );
      }
    } catch (err) {
      console.error("Error fetching districts:", err);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, [state]); // Re-fetch districts when state changes

  const navigate = useNavigate();
  const handleClickChange = (name) => {
    setDistrict(name);
    navigate("/Book_Appointement_Hospital");
  };

  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select District</div>
      <div>
        {/* You could add a loading indicator here while districts are being fetched */}
        {uniqueDistricts.map((name, index) => (
          <button
            onClick={() => handleClickChange(name)}
            key={index}
            className="w-[47%] text-centre m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Book_Appointement_District_Data;
