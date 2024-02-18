import React, { useContext } from "react";
import Login_Image from "../../Assets/Login_Image.webp";
import styled from "styled-components";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import {FcGoogle} from "react-icons/fc"

const VerticalLine = styled.div`
  height: 100vh;
  width: 1px;
  background-color: black;
  position: absolute;
  right: 5reml;
  top: 0;
`;

const Template = ({ formType }) => {
  // const { setIsLoggedIn } = useContext(AppContext);
  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto justify-evenly items-center">
      <img src={Login_Image} alt="Earth"></img>
      {/* <VerticalLine /> */}

      <div className="border border-gray-400 w-11/12 max-w-[450px] p-7 h-full">
        {formType === "signup" ? <SignupForm /> : <LoginForm />}

        <div className="flex w-full items-centre my-4 gap-x-2">
          <div className="w-full h-[1px] bg-gray-900 mt-3"></div>
          <p className="text-gray-900 font-medium">OR</p>
          <div className="w-full h-[1px] bg-gray-900 mt-3"></div>
        </div>

        <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-gray-800 border border-gray-800 px-[12px] py-[8px] gap-x-2 mt-6">
        <FcGoogle/>Signin With Google</button>
      </div>
    </div>
  );
};

export default Template;
