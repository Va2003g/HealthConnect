const Doctor_Appointment = require('../models/Doctor_Appointement');

exports.Show_Accepted_Doctor_Appointements = async (req, res) => {
    try {
        const { doc_id } = req.query;

        if (!doc_id) {
            return res.status(400).json({
                success: false,
                message: "Provide Doctor ID"
            });
        }

        const appointments = await Doctor_Appointment.find({ doctor: doc_id, status: 'Scheduled' });

        return res.status(200).json({
            success: true,
            Data: appointments, // Sending appointments directly as an array
            Count: appointments.length
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch appointment data. Try again after some time"
        });
    }
};
