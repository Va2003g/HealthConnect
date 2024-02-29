import React from "react";
import "./index.css";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Registration/Login";
import Signup from "./Pages/Registration/Signup";
import { Routes, Route } from "react-router-dom";
import Forget from "./Pages/Registration/Forget";
import Verify_Otp from "./Pages/Registration/Verify_Otp";
import Book_Appointement_State from "./Pages/Book_Appointement/Book_Appointement_State";
import Book_Appointement_District from "./Pages/Book_Appointement/Book_Appointement_District";
import Book_Appointement_Hospital from "./Pages/Book_Appointement/Book_Appointement_Hospital";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/Verify_Otp" element={<Verify_Otp />} />
        <Route
          path="/Book_Appointement_State"
          element={<Book_Appointement_State />}
        ></Route>
        <Route
          path="/Book_Appointement_District"
          element={<Book_Appointement_District />}
        ></Route>
        <Route
          path="/Book_Appointement_Hospital"
          element={<Book_Appointement_Hospital />}
        ></Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
