const DoctorAppointment = require("../models/Doctor_Appointement"); // Assuming singular form
const mongoose = require("mongoose");

exports.deleteDAppoint = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provide Id of the Doctor Appointment",
      });
    }

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id provided",
      });
    }

    // Find appointment by id and delete it
    const deletedAppointment = await DoctorAppointment.findByIdAndDelete(id);

    // If appointment not found, return 404
    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Doctor Appointment not found",
      });
    }

    // Return success message
    return res.status(200).json({
      success: true,
      message: "Doctor Appointment Deleted Successfully",
    });
  } catch (err) {
    console.error("Error deleting doctor appointment:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete doctor appointment", // Consider a more generic error message for security
    });
  }
};
