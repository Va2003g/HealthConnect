import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const LoginForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 "
    >
      <label className="w-full">
        <p className="text-[0.65rem] mb-1 leading-[1.375rem]">
          Email Address <sup>*</sup>
        </p>
        <input
          required
          type="Email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email id"
          name="email"
          className="bg-grey-900 rounded-[0.2rem] w-full p-[4px] border border-gray-400"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.65rem] mb-1 leading-[1.375rem]">
          Password <sup>*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
        />
        <span
          className="absolute right-3 top-[50%] transform -translate-y-1/3 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={15} />
          ) : (
            <AiOutlineEye fontSize={15} />
          )}
        </span>

        <Link to="/Forget">
          <p className="text-xs text-blue-400 max-w-max ml-auto font-bold mt-2">Forget Password</p>
        </Link>
      </label>

      <button className="bg-blue-500 rounded-[8px] font-medium text-white px-[12px] py-[8px]">Sign in</button>
    </form>
  );
};

export default LoginForm;
