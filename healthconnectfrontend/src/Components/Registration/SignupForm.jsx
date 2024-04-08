import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const { isLoggedIn, setAndCheckExpiration, setName,setUid,role,setRole } = useContext(AppContext);
  const [accountType, setAccountType] = useState("Patient");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    accountType: "Patient", // Set initial value here
    speciality: "", // Set initial value for speciality here
  });

  function changeHandler(event) {
    const { name, value } = event.target;
  
    if (name === "FirstName" || name === "LastName") {
      const regex = /^[A-Za-z]+$/;
      if (value === "" || regex.test(value)) { 
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log("passes");
      }
    } else if (name === "Email") {
      const emailRegex = /^[A-Za-z0-9@.]+$/;
      if (value === "" || emailRegex.test(value)) { 
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log("email passes");
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }
  // function changeHandler(event) {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [event.target.name]: event.target.value,
  //   }));
  // }

  async function submitHandler(event) {
    console.log(formData);
    event.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/signup`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(response);

    if(!response.ok){
      const errormess = await response.json();
      toast.error(errormess.message);
      return;
    }

    if (response.ok) {
      const data = await response.json();
      toast.success(data.message);
      setName(formData.FirstName);
      setUid(data.id);
      setRole(formData.accountType);
      console.log(data.id);
      setAndCheckExpiration(true);
      if (role === "Patient") navigate("/");
      else navigate("/Doctor_UI");
    }
  }

  useEffect(() => {
    console.log("Effect triggered. isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const setAccountTypeAndUpdateFormData = (type) => {
    setAccountType(type);
    setFormData((prevData) => ({
      ...prevData,
      accountType: type,
      speciality: type === "Doctor" ? "" : undefined, // Set speciality only for Doctor
    }));
  };

  return (
    <div>
      <div className="flex p-1 gap-x-1 rounded-full max-w-max border border-gray-400">
        <button
          onClick={() => setAccountTypeAndUpdateFormData("Patient")}
          className={`${
            accountType === "Patient"
              ? "bg-blue-500 text-white"
              : "bg-transparent"
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          Patient
        </button>
        <button
          onClick={() => setAccountTypeAndUpdateFormData("Doctor")}
          className={`${
            accountType === "Doctor"
              ? "bg-blue-500 text-white"
              : "bg-transparent"
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          Doctor
        </button>
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
        {accountType === "Doctor" && ( // Render speciality field only if accountType is Doctor
          <div className="mt-[15px]">
            <label>
              <p className="text-[0.65rem] mb-1 leading-[1.375rem]">
                Speciality <sup>*</sup>
              </p>
              <input
                required
                type="text"
                value={formData.speciality}
                onChange={changeHandler}
                placeholder="Enter Speciality"
                name="speciality"
                className="rounded-[0.2rem] w-full p-[4px] border border-gray-400"
              />
            </label>
          </div>
        )}
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
