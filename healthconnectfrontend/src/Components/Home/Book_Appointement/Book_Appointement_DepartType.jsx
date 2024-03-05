import React from "react";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

const Book_Appointement_DepartType = () => {

  const navigate = useNavigate();
  const {appointmentData,setAppointmentData} = useContext(AppContext);
  const clickHandler = (event)=>
  {
    setAppointmentData((appointmentData)=>{
      return {...appointmentData,departmentName:event.target.innerText}
    });
    navigate('/Book_Appointement_Dates')
  }
  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select Type</div>
      <div className="flex flex-col gap-[2rem] my-[5rem]">
          <div onClick={clickHandler} className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
            General Medicine
          </div>
        <div onClick={clickHandler} className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
          Opthamology
        </div>
        <div onClick={clickHandler} className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
          Orthopedics
        </div>
        <div onClick={clickHandler} className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
          Cardiology
        </div>
        <div onClick={clickHandler} className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
          Dentistry
        </div>
      </div>
    </div>
  );
};

export default Book_Appointement_DepartType;
