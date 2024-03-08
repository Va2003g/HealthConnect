const DoctorAppointment = require("../models/Doctor_Appointement");
const User = require("../models/User");

exports.Get_Doctor_Appointement = async (req, res) => {
  try {
    const { doctorId, patientId, date } = req.body;

    if (!doctorId || !patientId || !date) {
      console.log("Provide Complete Details");
      return res.status(400).json({
        success: false,
        message: "Provide Complete Details",
      });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor) {
      console.log("Doctor not found");
      return res.status(400).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const patient = await User.findById(patientId);
    if (!patient) {
      console.log("Patient not found");
      return res.status(400).json({
        success: false,
        message: "Patient not found",
      });
    }

    const existingAppointment = await DoctorAppointment.findOne({
      doctor: doctorId,
      patient: patientId,
      date: date,
    });

    if (existingAppointment) {
      console.log("Appointment already exists for the same user, doctor, and date");
      return res.status(400).json({
        success: false,
        message: "Appointment already exists for the same user, doctor, and date",
      });
    }

    const newAppointment = await DoctorAppointment.create({
      doctor: doctorId,
      patient: patientId,
      date: date,
      status: "Pending",
    });

    console.log(newAppointment);

    return res.status(200).json({
      success: true,
      message: `Appointment booked successfully with ${doctor.name} on ${date}`,
      appointment: newAppointment,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error in Booking Appointment",
    });
  }
};
