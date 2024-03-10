import React from "react";
import "./index.css";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Login from "./Pages/Registration/Login";
import Signup from "./Pages/Registration/Signup";
import { Routes, Route } from "react-router-dom";
import Forget from "./Pages/Registration/Forget";
import Reset_Password from "./Pages/Registration/Reset_Password";
import Book_Appointement_State from "./Pages/Book_Appointement/Book_Appointement_State";
import Book_Appointement_District from "./Pages/Book_Appointement/Book_Appointement_District";
import Book_Appointement_Hospital from "./Pages/Book_Appointement/Book_Appointement_Hospital";
import Hospital_Near_ME from "./Components/Home/Special Services/Special Services Components/Hospital_Near_Me";
import Book_Appointement_SelectType from "./Components/Home/Book_Appointement/Book_Appointement_SelectType";
import Book_Appointement_Type from "./Pages/Book_Appointement/Book_Appointement_Type";
import Book_Appointement_Departement from "./Pages/Book_Appointement/Book_Appointement_Departement";
import Book_Appointement_SelectMode from "./Pages/Book_Appointement/Book_Appointement_SelectMode";
import Book_Appointement_Doctors from "./Pages/Book_Appointement/Book_Appointement_Doctors";
import Book_Appointement_Dates from "./Pages/Book_Appointement/Book_Appointement_Dates";
import Book_Appointement_Doctor_Date_Data from "./Components/Home/Book_Appointement/Book_Appointement_Doctor_Date_Data";
import Book_Appointement_Doctor_Date from "./Pages/Book_Appointement/Book_Appointement_Doctor_Date";
import Doctor_HomeScreen from "./Pages/DoctorHome/Home/Doctor_HomeScreen";
import Available_Appointments from "./Components/Doctor_UI/Home/Available_Appointements";
import Scheduled_Appointements from "./Components/Doctor_UI/Home/scheduled_Appointements";
import ViewAppointements from "./Pages/ViewAppointements";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/Reset_Password/:id" element={<Reset_Password />} />
        {/* <Route path="/Verify_Otp" element={<Verify_Otp />} /> */}
        <Route path="/Hospital_Near_Me" element={<Hospital_Near_ME />}></Route>
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
        <Route
          path="/Book_Appointement_type"
          element={<Book_Appointement_Type />}
        ></Route>
        <Route
          path="/Book_Appointement_Depart"
          element={<Book_Appointement_Departement />}
        ></Route>
        <Route
          path="/Book_Appointement_Mode"
          element={<Book_Appointement_SelectMode />}
        ></Route>
        <Route
          path="/Book_Appointement_Doctor"
          element={<Book_Appointement_Doctors />}
        ></Route>
        <Route
          path="/Book_Appointement_Dates"
          element={<Book_Appointement_Dates />}
        ></Route>
        <Route
          path="/Book_Appointement_Doctor_Date_Data"
          element={<Book_Appointement_Doctor_Date />}
        ></Route>
        <Route path="/Doctor_UI" element={<Doctor_HomeScreen />}></Route>
        <Route
          path="/Available_Appointments"
          element={<Available_Appointments />}
        ></Route>
        <Route
          path="/scheduled_Appointments"
          element={<Scheduled_Appointements />}
        ></Route>
        <Route
          path="/view_Appointments"
          element={<ViewAppointements />}
        ></Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
