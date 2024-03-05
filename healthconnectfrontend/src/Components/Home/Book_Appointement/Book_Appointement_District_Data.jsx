import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";

const Book_Appointement_District_Data = () => {
  const { state, setDistrict,appointmentData,setAppointmentData } = useContext(AppContext);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchDistricts = async () => {
    setLoading(true);
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
        setLoading(false);
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
  const handleClickChange = (event) => {
    setDistrict(event.target.innerText);
    setAppointmentData((appointmentData)=>{
      return {...appointmentData,district:event.target.innerText}
    })
    navigate("/Book_Appointement_Hospital");
  };

  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select District</div>
      <div>
        {/* You could add a loading indicator here while districts are being fetched */}
        {loading ? (
            <div className=" w-100 h-[60vh] flex justify-center items-center">
              <SpinningCircles color="#4299e1" fill="#4299e1"/>
            </div>
          ) :
        uniqueDistricts.map((name, index) => (
          <button
            onClick={handleClickChange}
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
