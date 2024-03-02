import React from "react";
import { Link } from "react-router-dom";

const Book_Appointement_DepartType = () => {
  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select Type</div>
      <div className="flex flex-col gap-[2rem] my-[5rem]">
        <Link to="#">
          <div className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
            General Medicine
          </div>
        </Link>
        <div className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
          Opthamology
        </div>
        <div className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
          Orthopedics
        </div>
        <div className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
          Cardiology
        </div>
        <div className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
          Dentistry
        </div>
      </div>
    </div>
  );
};

export default Book_Appointement_DepartType;
