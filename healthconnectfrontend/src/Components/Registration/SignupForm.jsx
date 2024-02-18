import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [accountType, setaccountType] = useState("student");
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
  }

  useEffect(() => {
    console.log("Effect triggered. isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <div className="flex p-1 gap-x-1 rounded-full max-w-max border border-gray-400">
        <button
          onClick={() => setaccountType("student")}
          className={`${
            accountType === "student"
              ? "bg-blue-500 text-white"
              : "bg-transparent"
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          Student
        </button>
        <button onClick={() => setaccountType("instructor")}
        className={`${
            accountType === "instructor"
              ? "bg-blue-500 text-white"
              : "bg-transparent"
          } py-2 px-5 rounded-full transition-all duration-200`}>Instructor</button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="flex gap-x-5 mt-[15px]">
          <label>
            <p className="text-[0.65rem] mb-1 leading-[1.375rem]">
              First Name <sup>*</sup>
            </p>
            <input
              required
              type="text"
              name="FirstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.FirstName}
              className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
            />
          </label>

          <label>
            <p className="text-[0.65rem] mb-1 leading-[1.375rem]">
              Last Name <sup>*</sup>
            </p>
            <input
              required
              type="text"
              name="LastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.LastName}
              className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
            />
          </label>
        </div>
        <div className="mt-[15px]">
          <label>
            <p className="text-[0.65rem] mb-1 leading-[1.375rem]">
              Email Address <sup>*</sup>
            </p>
            <input
              required
              type="email"
              value={formData.Email}
              onChange={changeHandler}
              placeholder="Enter Email id"
              name="Email"
              className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
            />
          </label>
        </div>
        <div className="flex gap-x-5 mt-[15px]">
          <label className="relative">
            <p className="text-[0.65rem] mb-1 leading-[1.375rem]">
              Create Password <sup>*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="Password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.Password}
              className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
            />
            <span
              className="absolute right-3 transform -translate-y-[-10px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={15} />
              ) : (
                <AiOutlineEye fontSize={15} />
              )}
            </span>
          </label>

          <label className="relative">
            <p className="text-[0.65rem] mb-1 leading-[1.375rem]">
              Confirm Password <sup>*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="ConfirmPassword"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.ConfirmPassword}
              className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
            />
            <span
              className="absolute right-3 transform -translate-y-[-10px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={15} />
              ) : (
                <AiOutlineEye fontSize={15} />
              )}
            </span>
          </label>
        </div>
        <button className="bg-blue-500 rounded-[8px] font-medium text-white px-[12px] py-[8px]   w-full mt-[15px] ">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
