const mongoose = require("mongoose");
const User = require("./User");
const Hospital = require("./Hospital");
const Department = require("./Department");
const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // doctor: { type: mongoose.Schema.Types.ObjectId, 
  //   ref: "Doctor", 
  //   default: null,
  // },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  date: Date,
  status: String, // e.g., 'Scheduled', 'Completed', 'Cancelled','Pending'
});

module.exports = mongoose.model("Appointment", appointmentSchema);
