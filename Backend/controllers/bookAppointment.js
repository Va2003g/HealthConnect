const Appointment = require('../models/Appointment');
const mailSender = require('../utilities/mailSender');
exports.bookAppointment =  async (req,res)=>{

    try{

        const {patientId,hospitalId,departmentId,date} = req.body;

        //authentication middleware will automatically check is user valid and a patient;
        //is date available?? no other appointments are there

        // send mail ki your appointment is pending for approval
        // send mail when appointment is approved;



    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to Book Appointment, Try again after some time"
        })
    }
}