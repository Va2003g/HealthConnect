import React from "react";
import { FcApproval } from "react-icons/fc";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Book_Appointement_DatesData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevhandler = () => {
    navigate(-1);
  };
  const starthandler = () => {
    navigate("/Book_Appointement_type");
  };

  const [value, onChange] = useState(new Date());
  const [datesToColor, setDatesToColor] = useState([]);
  const [monthlyAvailability, setMonthlyAvailability] = useState([]);
  const tileClassName = ({ date, view }) => {
    if (
      datesToColor.find((coloredDate) => {
        return coloredDate === date.getDate();
      })
    ) {
      return "text-green-500 underline decoration-3";
    }
    return "";
  };
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  console.log(year, month);

  const { appointmentData, setAppointmentData } = useContext(AppContext);
  console.log(appointmentData);
  let dataForDates = {
    hospitalName: appointmentData.hospitalName,
    state: appointmentData.state,
    district: appointmentData.district,
    departmentName: appointmentData.departmentName,
    month,
    year,
  };

  dataForDates = JSON.stringify(dataForDates);
  useEffect(() => {
    const fetchingDates = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/get-dates?data=${dataForDates}`,
          {
            method: "GET",
            header: {
              "content-type": "application/json",
            },
            // body:JSON.stringify(dataForDates)
          }
        );
        console.log(response);
        if (!response.ok) {
          console.log("error in fetching details");
          return;
        }
        const responseData = await response.json();
        console.log("responsedata", responseData);
        setMonthlyAvailability(
          responseData.monthlyAvailability ||
            responseData.filteredAppointments ||
            responseData.newMonthDates
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchingDates();
  }, []);

  useEffect(() => {
    filteringMonthlyAvailability();
  }, [monthlyAvailability]);

  function filteringMonthlyAvailability() {
    const newDatesToColor = [];
    monthlyAvailability.forEach((array) => {
      console.log(array.DOA);
      newDatesToColor.push(new Date(array.DOA).getDate());
    });
    setDatesToColor(newDatesToColor);
    console.log(newDatesToColor);
  }
  function monthName() {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    return month;
  }
  function bookHandler(){

    console.log(appointmentData.date);
    
  }
  return (
    <>
      <div className="h-[90vh] flex justify-evenly items-center">
        <div className="h-[100%] w-[56%] flex flex-col items-center justify-between ml-[-150px]">
          <div className=" h-[80%] w-[80%] shadow-2xl flex flex-col gap-y-7 justify-center p-8 ">
            <div className="mx-auto text-4xl mt-[-5px] uppercase">
              {appointmentData.type === "Book By Hospital" ? (
                <div>Hospital Booking</div>
              ) : (
                <div>Doctor Booking</div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xl">
              <FcApproval />
              State = {appointmentData.state}
            </div>
            <div className="flex items-center gap-1 text-xl">
              <FcApproval />
              District = {appointmentData.district}
            </div>
            <div className="flex items-center gap-1 text-xl">
              <FcApproval />
              Hospital = {appointmentData.hospitalName}
            </div>
            <div className="flex items-center gap-1 text-xl">
              <FcApproval />
              Departement = {appointmentData.departmentName}
            </div>
            <div className="flex items-center gap-1 text-xl">
              <FcApproval />
              Data Of Appointement = {appointmentData.date}
            </div>
            <div className="flex items-center gap-1 text-xl">
              <FcApproval />
              Confirmation Message
            </div>
          </div>
          <div className="w-[100%] flex gap-5 mb-[2rem] justify-evenly">
            {location.pathname !== "/Book_Appointement_Type" && (
              <>
                <div
                  onClick={prevhandler}
                  className=" w-[35%] flex px-7 py-4 bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow justify-center items-center cursor-pointer"
                >
                  <button className="text-center text-white font-semibold font-['Poppins']">
                    Previous
                  </button>
                </div>
                <div
                  onClick={starthandler}
                  className=" w-[35%] flex px-7 py-4 bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow justify-center items-center cursor-pointer"
                >
                  <button className="text-center text-white font-semibold font-['Poppins']">
                    Start Over
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col w-96 h-full items-center justify-start">
          <div className="ml-[-30px] mt-6 text-4xl uppercase">
            {monthName()} Bookings
          </div>
          <div className="mt-16 w-full">
            <Calendar
              onClickDay={(val) => {
                setAppointmentData((appointmentData) => {
                  return { ...appointmentData, data: val.getFullYear()+'-'+val.getMonth()+'-'+val.getDate()};
                });
              }}
              onChange={onChange}
              value={value}
              showNavigation={false}
              tileClassName={tileClassName}
              minDate={new Date(year, month - 1, 1)}
              width={100}
            />
          </div>
          <div className="mt-5 ml-[-30px]">
            <p className="text-green-800">
              *Green Color or underlined Dates are available
            </p>
          </div>
          <div
            onClick={bookHandler}
            className=" w-[100%] mt-5 flex px-7 py-4 bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow justify-center items-center cursor-pointer"
          >
            <button className="text-center text-white font-semibold font-['Poppins']">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book_Appointement_DatesData;
