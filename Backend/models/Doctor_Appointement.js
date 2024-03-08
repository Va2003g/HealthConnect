const mongoose = require("mongoose");

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
  date: Date,
  status: String, // e.g., 'Scheduled', 'Completed', 'Cancelled','Pending'
});

module.exports = mongoose.model(
  "Doctor_Appointment",
  Doctor_appointmentSchema
);
