import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

  const fetchdoctorDetails = async (Id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get_User_Details?id=${Id}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching patient details: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);

      if (data && data.data) {
        return data.data.name;
      } else {
        // console.error("Error: Patient name not found");
        return ""; // Set an empty string as a placeholder
      }
    } catch (err) {
      // console.error("Error fetching patient details:", err);
      return ""; // Set an empty string on error (optional)
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/viewAllDoctorAppointementForPatient?id=${Uid}`,
        {
          method: "GET",
          header: {
            "content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        // console.log(data.message);
        throw new Error(`Error fetching Appointments: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);

      if (data && data.Data) {
        const appointmentsWithdoctorDetails = await Promise.all(
          data.Data.map(async (appointment) => {
            const doctorDetails = await fetchdoctorDetails(appointment.doctor);
            return { ...appointment, doctorDetails };
          })
        );
        setAppointments(appointmentsWithdoctorDetails);
      } else {
        // console.error("Error: Appointments not found");
      }
    } catch (err) {
      // console.error("Error fetching Appointments:", err);
    } finally {
      setLoading(false); // Ensure loading state is set to false even on errors
    }
  };

  const handleDelete = async (Id) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/deleteDAppoint?id=${Id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }, // Add headers if needed
          // body: JSON.stringify({ id: Id }), // Add body if your backend expects data
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        fetchAppointments();
        setLoading(false);
      } else {
        const data = await response.json();
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.toString()); // Convert error object to string
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="m-[2rem]">
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
                Doctor: {appointment.doctorDetails || "Name Unavailable"}
              </div>
              {/* {console.log(appointment._id)} */}
            </div>
            <div
              className="px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow gap-[5.13px]"
              onClick={() => handleDelete(appointment._id)}
            >
              <div className="text-center text-white font-semibold font-['Poppins']">
                Cancel Appointment
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowAllUserAppointements;
