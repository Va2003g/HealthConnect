import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";

const Book_Appontement_DoctorsData = () => {
  const { setDoctor } = useContext(AppContext);
  const [allDoctors,setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch doctors data from backend
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-all-doc`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setAllDoctors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    // Call the function to fetch doctors data
    fetchDoctors();
  }, []);

  const navigate = useNavigate();
  const handleClickChange = (name) => {
    setDoctor(name._id);
    console.log(name._id);
    navigate("/Book_Appointement_Doctor_Date_Data");
  };

  return (
    <div className="h-[73vh] flex flex-col items-center overflow-scroll">
      <div className="text-2xl text-center mb-4">Select State</div>
      <div className="w-full max-w-[90%]">
        {loading ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <SpinningCircles color="#4299e1" fill="#4299e1" />
          </div>
        ) : allDoctors && allDoctors.length > 0 ? (
          allDoctors.map((doc) => (
            <button
              key={doc.id} // Assuming each doctor has a unique ID
              onClick={() => handleClickChange(doc)}
              className="w-full text-center my-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white"
            >
              {doc.name + " (" + doc.speciality + ")"}
            </button>
          ))
        ) : (
          <div>No doctors available</div>
        )}
      </div>
    </div>
  );
};

export default Book_Appontement_DoctorsData;
