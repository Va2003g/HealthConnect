import React, { useContext, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function StaticDatePickerLandscape() {
  const { setDoctorDate, doctor, doctorDate, Uid } = useContext(AppContext);
  const [tempdate, setTempDate] = useState();
  const navigate = useNavigate();

  const handleDateChange = async (newValue) => {
    console.log(newValue);

    const formattedDate = dayjs(tempdate).format("YYYY-MM-DD");
    setDoctorDate(formattedDate);
    const data = {
      doctorId: doctor,
      patientId: Uid,
      date: formattedDate, // Use newValue which is the updated date
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/Set_doctor_Appointement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errormess = await response.json();
        console.log(typeof errormess.message);
        toast.error(errormess.message);
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        console.log(responseData);
      }

      navigate("/view_Appointments");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-[73vh] overflow-scroll flex flex-col">
      <div className="text-2xl text-center">Select Date</div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="Portrait"
          minDate={dayjs()} // Set minDate to today's date
          onChange={(newValue) => setTempDate(newValue)} // Corrected line
          componentsProps={{
            actionBar: {
              actions: [], // Add this line
            },
          }}
        />

        <button
          className="text-center font-semibold font-['Poppins'] mt-[1rem]"
          onClick={handleDateChange}
        >
          Book Appointment
        </button>
      </LocalizationProvider>
    </div>
  );
}
