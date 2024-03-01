import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";

const Book_Appointement_HospitalData = () => {
  const { state, district } = useContext(AppContext);
  const [data, setData] = useState([]);

  async function getHospital() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-hospital-data?state=${state}&district=${district}`
      );
      const hospitalData = await response.json();
      setData(hospitalData.Data); // Only setting the array of hospitals
    } catch (error) {
      console.error("Error fetching hospital data:", error);
      // Handle errors here (e.g., display error message)
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getHospital();
    }
    fetchData();
  }, [state, district]);

  // Log data only if it's not empty
  useEffect(() => {
    if (data.length > 0) {
      console.log(data);
      console.log("Hospital Names:");
      data.forEach((hospital) => {
        console.log(hospital.Hospital_Name);
      });
    }
  }, [data]);

  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select Hospital</div>
      <div>
        {data && data.length > 0 ? (
          data.map((hospital, index) => (
            <button
              key={index}
              className="w-[47%] text-centre m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:"
            >
              {hospital?.Hospital_Name}
            </button>
          ))
        ) : (
          <div>No hospitals found.</div> // Display message if no data
        )}
      </div>
    </div>
  );
};

export default Book_Appointement_HospitalData;
