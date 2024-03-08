import React from "react";
import { Link } from "react-router-dom";

const Book_Appointement_SelectType = () => {
  return (
    <div className="h-[73vh] overflow-scroll">
      <div className="text-2xl text-center">Select Type</div>
      <div className="flex flex-col gap-[2rem] my-[5rem]">
        <Link to="/Book_Appointement_Mode">
          <div className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
            New Appointement
          </div>
        </Link>
        <Link to="/view_Appointments">
          <div className="text-center m-2 p-[1rem] border border-gray-500 rounded-lg transition duration-300 hover:bg-blue-400 hover:text-white hover:">
            View Appointement
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Book_Appointement_SelectType;
