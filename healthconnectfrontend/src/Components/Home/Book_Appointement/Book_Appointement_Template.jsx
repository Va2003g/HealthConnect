import React from "react";
import { FcApproval, FcPlus, FcPlanner, FcComments } from "react-icons/fc";
import Book_Appointement_State_Data from "./Book_Appointement_State_Data";
import Book_Appointement_District_Data from "./Book_Appointement_District_Data";

const Book_Appointement_Template = ({ type }) => {
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
      <div className="w-[50%] h-[80%] shadow-2xl mr-[6rem] my-[4rem]">
        {type === "State" ? (
          <Book_Appointement_State_Data />
        ) : (
          <Book_Appointement_District_Data />
        )}
      </div>
    </div>
  );
};

export default Book_Appointement_Template;
