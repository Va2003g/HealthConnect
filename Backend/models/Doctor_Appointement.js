const mongoose = require("mongoose");
const User = require("./User"); // Assuming Doctor model is defined in Doctor.js

const Doctor_appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there's a User model for the patient
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  doctorName: String, // Adding doctorName field
  speciality: String, // Adding speciality field
  date: Date,
  status: String, // e.g., 'Scheduled', 'Completed', 'Cancelled','Pending'
});

module.exports = mongoose.model(
  "Doctor_Appointement",
  Doctor_appointmentSchema
);
