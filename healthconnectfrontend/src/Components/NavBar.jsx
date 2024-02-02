import React, { useContext } from "react";
import Logo_Image from "../Assets/HealthConnectLogo.jpeg";
import { Link } from "react-router-dom";
import { AppContext } from "./Context/AppContext";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  return (
    <div className="flex space justify-evenly">
      <Link to="/">
        <img
          src={Logo_Image}
          alt="Logo"
          width={160}
          height={42}
          loading="lazy"
        />
      </Link>

      <nav className="">
        <ul className="flex gap-3">
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

      <div className="flex ml-5 mr-3 gap-3">
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
  );
};

export default NavBar;
