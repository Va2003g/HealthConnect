const express = require("express");
const router = express.Router();
// const hospital = require('../models/Hospital')
const Hospital = require("../models/Hospital");
//landing route
router.get("/", (req, res) => res.send(`<h1>Health Connect Backend</h1>`));

//signup handlers
const signUp = require("../controllers/SignUp");
router.post("/signup", signUp.signup);

//login handlers
const { login } = require("../controllers/login");
router.post("/login", login);

//forget password
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword");

const {
  Get_Doctor_Appointement,
} = require("../controllers/Get_Doctor_Appointement");
const { deleteDAppoint } = require("../controllers/deleteDAppoint");
router.post("/reset-password-token", resetPasswordToken);
router.post("/Set_doctor_Appointement", Get_Doctor_Appointement);
router.put("/reset-password", resetPassword);

//getting hospital data for checking
// router.get('/get-hospital-data', async (req,res)=>{
//     try{
//         let data = await Hospital.find({State:"Punjab"});
//         res.status(200).json(data);
//     }catch(err)
//     {
//         console.log(err);
//         res.status(500).send({
//             message:"Failed",
//         });
//     }
// });

const {
  authentication,
  isPatient,
  isDoctor,
} = require("../middleware/authentication");
const { getHospitalData } = require("../controllers/getHospitalData");
const { getUniqueStates } = require("../controllers/getStates");
const { getDistrict } = require("../controllers/getDistrict");
const { Get_NearBy_Hospitals } = require("../controllers/Get_NearBy_Hospitals");
const {
  getAppointmentDateData,
} = require("../controllers/getAppointmentDateData");
const { bookAppointment } = require("../controllers/bookAppointment");
const { ShowDoctors } = require("../controllers/Show_Doctors");
const {
  Show_Pending_Doctor_Appointements,
} = require("../controllers/Show_Pending_Doctor_Appointements");
const {
  Show_Accepted_Doctor_Appointements,
} = require("../controllers/Show_Accepted_Doctor_Appintement");
const { getUserDetails } = require("../controllers/getUserDetails");
const {
  approveAppointement,
} = require("../controllers/approvePendingAppointements");
const {
  rejectAppointement,
} = require("../controllers/rejectPendingappointement");
const {
  viewAllDoctorAppointementForPatient,
} = require("../controllers/viewAllDoctorAppointementForPatient");
const {
  viewAllHospitalAppointementForPatient,
} = require("../controllers/viewAllHospitalAppointementforPatient");
const { getHospitalDetails } = require("../controllers/getHospitalDetails");
const {
  getDepartementDetails,
} = require("../controllers/getDepartementDetails");
const { deleteHospitalAppointment } = require("../controllers/deleteHospitalAppointment");

// router.get('/get-hospital-data',authentication,getHospitalData);
router.get("/get-hospital-data", getHospitalData);
router.get("/get-state", getUniqueStates);
router.get("/get-district", getDistrict);
router.get("/getNearbyHospital", Get_NearBy_Hospitals);
router.get("/get-all-doc", ShowDoctors);
router.get("/get-dates", getAppointmentDateData);
router.post("/book-appointment", bookAppointment);
router.get(
  "/show-Doctor-Pending-Appointement",
  Show_Pending_Doctor_Appointements
);
router.get(
  "/show_Accepted_Doctor_Appointement",
  Show_Accepted_Doctor_Appointements
);
router.get(
  "/viewAllDoctorAppointementForPatient",
  viewAllDoctorAppointementForPatient
);
router.get(
  "/viewAllHospitalAppointementForPatient",
  viewAllHospitalAppointementForPatient
);

router.delete("/deleteDAppoint", deleteDAppoint);
router.delete("/deleteHospitalAppointment",deleteHospitalAppointment)
router.get("/get_User_Details", getUserDetails);
router.get("/get_Hospital_Details", getHospitalDetails);
router.get("/get_Departement_Details", getDepartementDetails);

router.put("/approveDoctorAppointement", approveAppointement);

router.put("/rejectDoctorAppointement", rejectAppointement);

router.get("/test", authentication, isPatient, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to protected route for Patient",
  });
});

module.exports = router;
