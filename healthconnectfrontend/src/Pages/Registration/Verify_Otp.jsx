import React, { useContext, useState } from "react";
import Login_Image from "../../Assets/Login_Image.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Components/Context/AppContext";

const Verify_Otp = () => {
  const location = useLocation();
  const { email } = location.state;
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const [OTP, setOTP] = useState("");

  function changeHandler(event) {
    setOTP(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    navigate("/");
  }

  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto justify-evenly items-center">
      <img src={Login_Image} alt="Earth"></img>

      <div className="border border-gray-400 w-11/12 max-w-[450px] h-full">
        <div>
          <h3 className="px-7 py-2">Verify Email</h3>
          <div class="border border-gray-150 border-t-2 w-full"></div>
        </div>
        <div className="px-7 py-4">
          <p className="text-sm text-gray-500">We have sent you an OTP on</p>
          <div>{email}</div>
          <form onSubmit={submitHandler}>
            <label>
              <p className="text-[0.65rem] mb-2 mt-4 leading-[1.375rem]">
                OTP <sup>*</sup>
              </p>
              <input
                required
                type="text"
                value={OTP}
                onChange={changeHandler}
                placeholder="Enter OTP"
                className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
              />
              <button className="bg-blue-500 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-4 w-full">
                Log in
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify_Otp;
