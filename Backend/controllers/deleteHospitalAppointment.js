const Appointment = require("../models/Appointment"); 
const mongoose = require("mongoose");

exports.deleteHospitalAppointment = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provide Id of the Hospital Appointment",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id provided",
      });
    }


    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Hospital Appointment not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Appointment Deleted Successfully",
    });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete appointment", 
    });
  }
};
