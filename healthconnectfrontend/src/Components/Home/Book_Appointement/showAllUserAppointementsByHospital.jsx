import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";
//import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ShowAllUserAppointementsByHospital = () => {
  const { Uid } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      // console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric", // Adjust formatting options as needed
    });
  };

  const fetchHospitalDetails = async (Id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get_Hospital_Details?id=${Id}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching Hospital details: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data);

      if (data && data.data) {
        // console.log(data.data);
        return data.data;
      } else {
        // console.error("Error: Hospital name not found");
        return ""; // Set an empty string as a placeholder
      }
    } catch (err) {
      //   console.error("Error fetching Hospital details:", err);
      return ""; // Set an empty string on error (optional)
    }
  };

  const fetchDepartementDetails = async (Id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get_Departement_Details?id=${Id}`
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching Departement details: ${response.status}`
        );
      }

      const data = await response.json();
      // console.log(data);

      if (data && data.data) {
        return data.data.name;
      } else {
        // console.error("Error: Departement name not found");
        return ""; // Set an empty string as a placeholder
      }
    } catch (err) {
      //   console.error("Error fetching Departement details:", err);
      return ""; // Set an empty string on error (optional)
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/viewAllHospitalAppointementForPatient?id=${Uid}`,
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
        const appointmentsWithPatientDetails = await Promise.all(
          data.Data.map(async (appointment) => {
            const HospitalDetails = await fetchHospitalDetails(
              appointment.hospital
            );
            // console.log("Hospital Details ", HospitalDetails);
            const DepartementDetails = await fetchDepartementDetails(
              appointment.department
            );
            return {
              ...appointment,
              HospitalDetails,
              DepartementDetails,
            };
          })
        );
        setAppointments(appointmentsWithPatientDetails);
      } else {
        // console.error("Error: Appointments not found");
      }
    } catch (err) {
      //   console.error("Error fetching Appointments:", err);
    } finally {
      setLoading(false); // Ensure loading state is set to false even on errors
    }
  };

  const handleDelete = async (Id) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/deleteHospitalAppointment?id=${Id}`,
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
                  Hospital:{" "}
                  {appointment.HospitalDetails.Hospital_Name ||
                    "Name Unavailable"}
                </div>
                <div>
                  Departement:{" "}
                  {appointment.DepartementDetails || "Name Unavailable"}
                </div>
              </div>
              <div className="flex gap-4 items-baseline">
                {appointment.HospitalDetails.Location_Coordinates && (
                  <div>
                    <a
                      href={`https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${appointment.HospitalDetails.Location_Coordinates}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-blue-500 hover:underline"
                    >
                      Get Directions
                    </a>
                  </div>
                )}
                <div
                  className="px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow gap-[5.13px]"
                  onClick={() => handleDelete(appointment._id)}
                >
                  <div className="text-center text-white font-semibold font-['Poppins']">
                    Cancel Appointment
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowAllUserAppointementsByHospital;
