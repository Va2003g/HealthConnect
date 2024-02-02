import React, { useContext } from "react";
import Login_Image from "../../Assets/Login_Image.webp";
import styled from "styled-components";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { AppContext } from "../Context/AppContext";

const VerticalLine = styled.div`
  height: 100vh;  
  width: 1px;
  background-color: black; 
  position: absolute; 
  right: 5reml;
  top: 0;
`;

const Template = ({formType}) => {
  const {setIsLoggedIn} = useContext(AppContext);
  return (
    <div>
      <img src={Login_Image} alt="Earth"></img>
      <VerticalLine />

      {formType === "signup" ? <SignupForm /> : <LoginForm />}

        <div>
            <div></div>
            <p>OR</p>
            <div></div>
        </div>

        <button>
            Signin With Google
        </button>
    </div>
  );
};

export default Template;
