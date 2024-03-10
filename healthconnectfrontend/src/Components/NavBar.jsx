import React, { useContext } from "react";
import Logo_Image from "../Assets/HealthConnectLogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./Context/AppContext";

const NavBar = () => {
  const { isLoggedIn, setAndCheckExpiration, role } = useContext(AppContext);
  const { name, setName } = useContext(AppContext);

  const navigate = useNavigate();
  const homePageRedirect = () => {
    if (role === "Doctor") {
      navigate("/Doctor_UI");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="">
      <div className="flex justify-between mx-8 my-3 items-center">
        <img
          src={Logo_Image}
          alt="Logo"
          width={160}
          height={42}
          loading="lazy"
          onClick={homePageRedirect}
        />

        <div className="flex mt-2 gap-5 items-center">
          {!isLoggedIn && (
            <Link to="/login">
              <div className="w-full h-full px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow gap-[5.13px]">
                <div className="text-center text-white font-semibold font-['Poppins']">
                  Log in
                </div>
              </div>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/signup">
              <div className="w-full h-full px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow gap-[5.13px]">
                <div className="text-center text-white font-semibold font-['Poppins']">
                  Sign up
                </div>
              </div>
            </Link>
          )}
          {isLoggedIn && (
            <div className="text-center font-semibold font-['Poppins']">
              {name}
            </div>
          )}
          {isLoggedIn && (
            <Link to="/">
              <button
                onClick={() => setAndCheckExpiration(false)}
                className=" w-full h-full px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow justify-start items-start gap-[5.13px] inline-flex"
              >
                <div className="text-center text-white font-semibold font-['Poppins']">
                  Log Out
                </div>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
