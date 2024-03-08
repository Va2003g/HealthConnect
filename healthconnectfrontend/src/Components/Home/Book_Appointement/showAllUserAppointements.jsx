import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";
import { Link } from "react-router-dom";

const ShowAllUserAppointements = () => {
  const { Uid } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric", // Adjust formatting options as needed
    });
  };

  const fetchPatientDetails = async (Id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get_User_Details?id=${Id}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching patient details: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data && data.data) {
        return data.data.name;
      } else {
        console.error("Error: Patient name not found");
        return ""; // Set an empty string as a placeholder
      }
    } catch (err) {
      console.error("Error fetching patient details:", err);
      return ""; // Set an empty string on error (optional)
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/viewAllDoctorAppointementForPatient?id=${Uid}`
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data.message);
        throw new Error(`Error fetching Appointments: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      if (data && data.Data) {
        const appointmentsWithPatientDetails = await Promise.all(
          data.Data.map(async (appointment) => {
            const patientDetails = await fetchPatientDetails(
              appointment.patient
            );
            return { ...appointment, patientDetails };
          })
        );
        setAppointments(appointmentsWithPatientDetails);
      } else {
        console.error("Error: Appointments not found");
      }
    } catch (err) {
      console.error("Error fetching Appointments:", err);
    } finally {
      setLoading(false); // Ensure loading state is set to false even on errors
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [Uid]);

  return (
    <div className="overflow-scroll m-[2rem] h-[84vh]">
        <div className="text-2xl text-center">Scheduled Appointements</div>
      
      <div>
      <div className="text-2xl text-center my-5">Appointements as Per Doctor</div>
        {loading ? (
          <div className="w-100 h-[60vh] flex justify-center items-center">
            <SpinningCircles color="#4299e1" fill="#4299e1" />
          </div>
        ) : (
          appointments.map((appointment, index) => (
            <div
              key={index}
              className="flex justify-between items-center m-4 border border-gray-500 rounded-lg p-4 cursor-pointer"
            >
              <div>
                <div>Date: {formatDate(appointment.date)}</div>
                <div>
                  Patient: {appointment.patientDetails || "Name Unavailable"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowAllUserAppointements;
