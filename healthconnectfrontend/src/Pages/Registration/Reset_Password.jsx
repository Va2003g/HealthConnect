import React, { useContext, useState } from "react";
import Login_Image from "../../Assets/Login_Image.webp";
import { useLocation, useNavigate} from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { AppContext } from "../../Components/Context/AppContext";

const Reset_Password = () => {
  const location = useLocation();
  const { id } = useParams();
  // const { email } = location.state;
  const { setIsLoggedIn } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    password:"",
    confirmPassword:"",
    id:id,
  });

  function changeHandler(event) {
    setCredentials((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    // setIsLoggedIn(true);
    // navigate("/");
    
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reset-password`,
    {
      method:"PUT",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(credentials)
    })
    console.log(response);
    if(response.ok)
    {
      alert("Password Changed Successfully")
      navigate("/login");
    }
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
          <p className="text-sm text-gray-500">We have sent you an OTP on your email id</p>
          {/* <div>{email}</div> */}
          <form onSubmit={submitHandler}>
            <label>
              <p className="text-[0.65rem] mb-2 mt-4 leading-[1.375rem]">
                Password <sup>*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={changeHandler}
                placeholder="Enter New Password"
                name="password"
                className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
              />
              <span
              className="absolute transform -translate-y-[-10px] -translate-x-[25px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={15} />
              ) : (
                <AiOutlineEye fontSize={15} />
              )}
            </span>
              <p className="text-[0.65rem] mb-2 mt-4 leading-[1.375rem]">
                Confirm Password <sup>*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                value={credentials.confirmPassword}
                onChange={changeHandler}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
              />
              <span
              className="absolute transform -translate-y-[-10px] -translate-x-[25px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={15} />
              ) : (
                <AiOutlineEye fontSize={15} />
              )}
            </span>
              <button className="bg-blue-500 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-4 w-full">
                Change Password
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset_Password;
