import React from "react";
import Login_Image from "../../Assets/Login_Image.webp";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc";

const Template = ({ formType }) => {
  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto justify-evenly items-center">
      <img src={Login_Image} alt="Earth"></img>

      <div className="border border-gray-400 w-11/12 max-w-[450px] p-7 h-full">
        {formType === "signup" ? <SignupForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default Template;
