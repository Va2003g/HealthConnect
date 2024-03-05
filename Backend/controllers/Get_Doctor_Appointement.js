const DoctorAppoint = require("../models/Doctor_Appointement");
const Doctor = require("../models/User");

exports.Get_Doctor_Appointement = async (req, res) => {
    try {
        // Fetching data from request body
        const { Doc_id, Date } = req.body;

        // Find the doctor based on the provided Doc_id
        const doctor = await Doctor.findById(Doc_id);

        if (!doctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor not found"
            });
        }

        // Create a new document using the DoctorAppoint model
        const newAppointment = await DoctorAppoint.create({
            doctor: doctor._id,
            doctorName: doctor.name,
            speciality: doctor.speciality,
            date: Date,
            status: 'Pending', // Set default status if needed
        });

        console.log(newAppointment); // You can log the appointment here if you need it for debugging

        return res.status(200).json({
            success: true,
            message: `Appointment booked successfully for ${doctor.name}`,
            appointment: newAppointment
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server Error in Booking Appointment"
        });
    }
};
