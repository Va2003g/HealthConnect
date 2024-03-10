import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";
import { Link } from "react-router-dom";

const Scheduled_Appointements = () => {
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
        `${process.env.REACT_APP_BACKEND_URL}/show_Accepted_Doctor_Appointement?doc_id=${Uid}`
      );

      if (!response.ok) {
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
    <div className="h-[84vh] overflow-scroll mx-[2rem]">
      <div className="flex justify-between my-[3rem]">
        <div className="text-2xl">Scheduled Appointements</div>
        <Link to="/Available_Appointments">
          <div className="px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow gap-[5.13px]">
            <div className="text-center text-white font-semibold font-['Poppins']">
              Pending Request
            </div>
          </div>
        </Link>
      </div>

      <div>
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

export default Scheduled_Appointements;
