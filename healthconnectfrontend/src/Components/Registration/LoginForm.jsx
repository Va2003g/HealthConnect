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
    <form onSubmit={submitHandler}>
      <label>
        <p>
          Email Address <sup>*</sup>
        </p>
        <input
          required
          type="Email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email id"
          name="email"
        />
      </label>

      <label>
        <p>
          Password <sup>*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
        />
        <span onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>

        <Link to="#">
          <p>Forget Password</p>
        </Link>
      </label>

      <button>Sign in</button>
    </form>
  );
};

export default LoginForm;
