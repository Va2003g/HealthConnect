import React, { useContext } from "react";
import Logo_Image from "../Assets/HealthConnectLogo.jpeg";
import { Link } from "react-router-dom";
import { AppContext } from "./Context/AppContext";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  return (
    <div className="">
      <div className="flex justify-between mx-8 my-3 items-center">
        <Link to="/">
          <img
            src={Logo_Image}
            alt="Logo"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>

        <nav className="mt-2">
          <ul className="flex gap-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="flex mt-2 gap-5">
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
            <Link to="/">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-[76.01px] h-[27.38px] px-[20.51px] py-[7.69px] bg-gradient-to-r from-teal-300 to-sky-700 rounded-[19.99px] shadow justify-start items-start gap-[5.13px] inline-flex"
              >
                <div className="text-center text-white text-[8.20px] font-semibold font-['Poppins']">
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
