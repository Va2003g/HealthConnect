const Doctor_appointment = require("../models/Doctor_Appointement");

exports.rejectAppointement = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provide ID",
      });
    }

    const appointmentToUpdate = await Doctor_appointment.findById(id);

    if (!appointmentToUpdate) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointmentToUpdate.status = "Rejected";

    const updatedAppointment = await appointmentToUpdate.save();
    return res.status(200).json({
      success: true,
      message: `Appointment Updated Sucessfully`,
      appointment: appointmentToUpdate,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error in Booking Appointment",
    });
  }
};
