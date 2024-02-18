import React, { useContext } from "react";
import Logo_Image from "../Assets/HealthConnectLogo.jpeg";
import { Link } from "react-router-dom";
import { AppContext } from "./Context/AppContext";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  return (
    <div className="">
      <div className="flex justify-evenly items-center">
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
              <button>Login</button>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/signup">
              <button>SignUp</button>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/">
              <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            </Link>
          )}
        </div>
      </div>
      <hr className="bg-gray-800 mt-2" />
    </div>
  );
};

export default NavBar;
