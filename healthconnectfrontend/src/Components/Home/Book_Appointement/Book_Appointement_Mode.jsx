import React from "react";
import { Link, useLinkClickHandler } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

const Book_Appointement_Mode = () => {

  const {appointmentData,setAppointmentData} = useContext(AppContext);
  const clickHandler = (event)=>{
    setAppointmentData((appointmentData)=>{
     return { ...appointmentData,type:event.target.innerText,}
    })
  }
  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select Mode</div>
      <div className="flex flex-col gap-[2rem] my-[5rem]">
        <Link to="/Book_Appointement_Doctor">
          <div onClick={clickHandler} className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
            Book By Doctor
          </div>
        </Link>
        <Link to="/Book_Appointement_State">
          <div onClick={clickHandler} className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
            Book By Hospital
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Book_Appointement_Mode;
