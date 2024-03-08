import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { SpinningCircles } from "react-loading-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Available_Appointments = () => {
  const { Uid } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
        return "";
      }
    } catch (err) {
      console.error("Error fetching patient details:", err);
      return "";
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/show-Doctor-Pending-Appointement?doc_id=${Uid}`
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
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [Uid]);

  const navigate = useNavigate();
  const handleClickChange = (patientId) => {
    navigate(`/`);
  };

  const handleScheduleClickApprove = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/approveDoctorAppointement?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error updating appointment status: ${response.status}`
        );
      }

      if (response.ok) {
        fetchAppointments();
        toast.success("Appointment approved successfully");
      }

      const data = await response.json();
      console.log("Appointment status update response:", data);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error("Failed to approve appointment");
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleClickReject = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/rejectDoctorAppointement?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error updating appointment status: ${response.status}`
        );
      }

      if (response.ok) {
        fetchAppointments();
        toast.success("Appointment rejected successfully");
      }

      const data = await response.json();
      console.log("Appointment status update response:", data);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error("Failed to reject appointment");
    } finally {
      setLoading(false);
    }
  };

  const approveAppointement = (appointment) => {
    const appointmentId = appointment._id;
    handleScheduleClickApprove(appointmentId);
  };

  const rejectAppointement = (appointment) => {
    const appointmentId = appointment._id;
    handleScheduleClickReject(appointmentId);
  };

  return (
    <div className="h-[73vh] overflow-scroll mx-[2rem]">
      <div className="flex justify-between my-[3rem]">
        <div className="text-2xl">Pending Request</div>
        <Link to="/scheduled_Appointments">
          <div className="px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow gap-[5.13px]">
            <div className="text-center text-white font-semibold font-['Poppins']">
              Scheduled Appointments
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
              <div className="flex gap-9">
                <div
                  className="h-full px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow gap-[5.13px]"
                  onClick={() => approveAppointement(appointment)}
                >
                  <div className="text-center text-white font-semibold font-['Poppins']">
                    Accept
                  </div>
                </div>
                <div
                  className="h-full px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow gap-[5.13px]"
                  onClick={() => rejectAppointement(appointment)}
                >
                  <div className="text-center text-white font-semibold font-['Poppins']">
                    Reject
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

export default Available_Appointments;
