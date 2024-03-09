const Doctor_Appointment = require("../models/Appointment");

exports.viewAllHospitalAppointementForPatient = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provide ID",
      });
    }

    const appointments = await Doctor_Appointment.find({
      patient: id,
      status: "Scheduled",
    });

    return res.status(200).json({
      success: true,
      Data: appointments, // Sending appointments directly as an array
      Count: appointments.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch appointment data. Try again after some time",
    });
  }
};
