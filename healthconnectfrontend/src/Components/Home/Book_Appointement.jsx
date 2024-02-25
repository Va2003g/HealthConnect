import React from "react";
import { Link } from "react-router-dom";
import BackGround_img from "../../Assets/Book_Appointement_BackGround.jpeg";
import ForeGround_img from "../../Assets/Book_Appointement_ForeGround.jpeg";

const Book_Appointement = () => {
  return (
    <div className="flex justify-between mt-6">
      <div className="mx-[13rem] my-[3rem]">
        <div className="">
          <div className="text-indigo-950 text-6xl font-bold font-['Poppins']">
            We Are Ready to
          </div>
          <div className="text-teal-300 text-6xl font-bold font-['Poppins']">
            Help Anywhere
          </div>
          <div className="text-indigo-950 text-6xl font-bold font-['Poppins']">
            Anytime
          </div>
        </div>
        <div className="text-stone-300 text-2xl font-medium font-['Poppins'] mt-5">
          In times like today, your health is very important,
          <br />
          especially since the number of COVID-19 cases is
          <br />
          increasing day by day, so we are ready to help you
          <br />
          with your health consultation
        </div>

        <Link to="/Book_Appointement_State">
          <button className="px-4 py-2 bg-gradient-to-r from-teal-300 to-sky-700 rounded-full my-5">
            <div className="text-center text-white text-xl font-semibold font-['Poppins']">
              Book Appointement
            </div>
          </button>
        </Link>

        <div className="flex gap-[4rem]">
          <div>
            <div className="text-sky-700 text-3xl font-bold font-['Poppins']">
              100+
            </div>
            <div className="w-[51.78px] text-stone-300 font-semibold font-['Poppins']">
              Active Doctors
            </div>
          </div>

          <div className="">
            <div className="text-sky-700 text-3xl font-bold font-['Poppins']">
              100+
            </div>
            <div className="w-[51.78px] text-stone-300 font-semibold font-['Poppins']">
              Active Doctors
            </div>
          </div>

          <div>
            <div className="text-sky-700 text-3xl font-bold font-['Poppins']">
              100+
            </div>
            <div className="w-[51.78px] text-stone-300 font-semibold font-['Poppins']">
              Active Doctors
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <img
          src={BackGround_img}
          alt="bg"
          className="w-[550px] h-[500px] rounded-tl-[40%] rounded-bl-[10%]"
        ></img>
        <div className="w-[380px] h-[452.21px] bg-gradient-to-b from-teal-300 via-cyan-700 to-sky-700 rounded-tl-full rounded-tr-full border-8 border-white absolute top-[15%] left-[15%] overflow-hidden shadow-xl">
          <img
            src={ForeGround_img}
            alt="fg"
            className="w-full h-full absolute inset-0 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Book_Appointement;