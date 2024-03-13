import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";
import { Navigate, useNavigate } from "react-router-dom";

const Book_Appointement_HospitalData = () => {
  const { state, district } = useContext(AppContext);
  const { setHospital,appointmentData,setAppointmentData} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  async function getHospital() {
    try {
      setloading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-hospital-data?state=${state}&district=${district}`
      );
      const hospitalData = await response.json();
      setData(hospitalData.Data);
      setloading(false); // Only setting the array of hospitals
    } catch (error) {
      console.error("Error fetching hospital data:", error);
      // Handle errors here (e.g., display error message)
    }
  }

  useEffect(() => {
      getHospital();
  }, [state, district]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const navigate = useNavigate();
  const handleClickChange = (event) => {
    setHospital(event.target.innerText);
    console.log(event.target.innerText);
    setAppointmentData((appointmentData)=>{
      return {...appointmentData,hospitalName:event.target.innerText}
    })
    navigate("/Book_Appointement_Depart");
  };

  return (
    <div className="h-[73vh] overflow-scroll ">
      <div className="text-2xl text-center">Select Hospital</div>
      <div>
        {
          loading ? (
            <div className=" w-100 h-[60vh] flex justify-center items-center">
              <SpinningCircles color="#4299e1" fill="#4299e1"/>
            </div>
          ) : data && data.length > 0 ? (
            data.map((hospital, index) => (
              <button
                key={index}
                className="w-[47%] text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:"
                onClick={handleClickChange}
              >
                {hospital?.Hospital_Name}
              </button>
            ))
          ) : (
            <div>No hospitals found.</div>
          ) // Display message if no data
        }
      </div>
    </div>
  );
};

export default Book_Appointement_HospitalData;
