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
      <div>
        <button>Student</button>
        <button>Instructor</button>
      </div>

      <form onSubmit={submitHandler}>
        <div>
          <label>
            <p>
              First Name <sup>*</sup>
            </p>
            <input
              required
              type="text"
              name="FirstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.FirstName}
            />
          </label>

          <label>
            <p>
              Last Name <sup>*</sup>
            </p>
            <input
              required
              type="text"
              name="LastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.LastName}
            />
          </label>
        </div>
        <div>
          <label>
            <p>
              Email Address <sup>*</sup>
            </p>
            <input
              required
              type="email"
              value={formData.Email}
              onChange={changeHandler}
              placeholder="Enter Email id"
              name="Email"
            />
          </label>
        </div>
        <div>
          <label>
            <p>
              Create Password <sup>*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="Password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.Password}
            />
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <label>
            <p>
              Confirm Password <sup>*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="ConfirmPassword"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.ConfirmPassword}
            />
            <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </label>
        </div>
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default SignupForm;
