import React from "react";
import Doctor_Special_Services from "../../../Assets/Doctor_Special_Services.png";
import {
  FaCalculator,
  FaFlask,
  FaFlaskVial,
  FaHospital,
} from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const Special_Services = () => {
  return (
    <div>
      <div className="flex h-[100vh] mx-[5rem] gap-[30%]">
        <div className="my-[12rem] relative w-[25%] h-[55%] bg-gradient-to-b from-teal-300 via-cyan-700 to-sky-700 rounded-tl-full rounded-tr-full border-8 border-white shadow-xl mx-">
          <img
            src={Doctor_Special_Services}
            alt="fg"
            className="absolute top-[-32%]"
          />
        </div>
        <div>
          <div className="flex mt-[7rem] mb-[4rem]">
            <div className="text-indigo-950 text-6xl font-bold font-['Poppins'] mr-4">
              Our
            </div>
            <div className="text-teal-300 text-6xl font-bold font-['Poppins']">
              Special Services
            </div>
          </div>
          <div className="mx-9">
            <div className="flex justify-between mb-24">
              <div>
                <div className="w-full h-full bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
                  <FaCalculator size={48} color="white" />
                </div>
                <div>BMI Calculator</div>
              </div>
              <div>
                <div className="w-full h-full bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
                  <SlCalender size={48} color="white" />
                </div>
                <div>Period Tracker</div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="w-full h-full bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
                  <FaFlask size={48} color="white" />
                </div>
                <div>Lab Reports</div>
              </div>
              
                <div>
                  <Link to="/Hospital_Near_Me">
                      <div className="w-full h-full bg-gradient-to-b from-teal-300 to-sky-700 rounded-[25%] flex justify-center items-center mb-4">
                        <FaHospital size={48} color="white" />
                      </div>
                      <div>Hospital Near Me</div>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-5xl ml-[5rem] font-semibold text-sky-700">
        Latest News
      </div>
    </div>
  );
};

export default Special_Services;
