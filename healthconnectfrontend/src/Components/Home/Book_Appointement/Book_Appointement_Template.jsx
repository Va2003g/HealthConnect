import React from "react";
import { FcApproval, FcPlus, FcPlanner, FcComments } from "react-icons/fc";
import Book_Appointement_State_Data from "./Book_Appointement_State_Data";
import Book_Appointement_District_Data from "./Book_Appointement_District_Data";
import Book_Appointement_Hospital from "../../../Pages/Book_Appointement/Book_Appointement_Hospital";
import Book_Appointement_HospitalData from "./Book_Appointement_HospitalData";
import { useLocation, useNavigate } from "react-router-dom";
import Book_Appointement_SelectType from "./Book_Appointement_SelectType";
import Book_Appointement_DepartType from "./Book_Appointement_DepartType";
import Book_Appointement_Mode from "./Book_Appointement_Mode";
import Book_Appointement_Doctors from "../../../Pages/Book_Appointement/Book_Appointement_Doctors";
import Book_Appontement_DoctorsData from "./Book_Appontement_DoctorsData";
import Book_Appointement_Doctor_Date_Data from "./Book_Appointement_Doctor_Date_Data";

const Book_Appointement_Template = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevhandler = () => {
    navigate(-1);
  };
  const starthandler = () => {
    navigate("/Book_Appointement_type");
  };

  return (
    <div className="flex gap-[5%]">
      <div className="h-[70%] w-[45%] shadow-2xl ml-[6rem] my-[5rem] py-[2rem]">
        <div className="text-3xl text-center">Need an Appointement?</div>
        <div className="my-4 mx-6">
          Follow these Simple steps to Book Your Appointement Online
        </div>
        <div className="mx-6 flex flex-col gap-y-8">
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select Type
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select State
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcApproval />
            Select District
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcPlus />
            Select Hospital
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcPlus />
            Select Departement
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcPlanner />
            Select Data Of Appointement
          </div>
          <div className="flex items-center gap-1 text-xl">
            <FcComments />
            Confirmation Message
          </div>
        </div>
      </div>
      <div className="w-[50%] mr-[6rem] mt-[4rem]">
        <div className="h-[80%] shadow-2xl mb-[2rem]">
          {type === "State" ? (
            <Book_Appointement_State_Data />
          ) : type === "District" ? (
            <Book_Appointement_District_Data />
          ) : type === "Hospital" ? (
            <Book_Appointement_HospitalData />
          ) : type === "Select_Type" ? (
            <Book_Appointement_SelectType />
          ) : type === "Depart" ? (
            <Book_Appointement_DepartType />
          ) : type === "Mode" ? (
            <Book_Appointement_Mode />
          ) : type === "Doctors" ? (
            <Book_Appontement_DoctorsData/>
          ) : type === "Doctor_Date" ? (
            <Book_Appointement_Doctor_Date_Data/>
          ) : null}
        </div>
        <div className="flex gap-5 mb-[2rem] justify-evenly">
          {location.pathname !== "/Book_Appointement_Type" && (
            <>
              <div onClick={prevhandler} className=" w-[35%] flex px-7 py-4 bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow justify-center items-center cursor-pointer">
                <button
                  className="text-center text-white font-semibold font-['Poppins']"
                >
                  Previous
                </button>
              </div>
              <div onClick={starthandler} className=" w-[35%] flex px-7 py-4 bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow justify-center items-center cursor-pointer">
                <button
                  className="text-center text-white font-semibold font-['Poppins']"
                >
                  Start Over
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book_Appointement_Template;
