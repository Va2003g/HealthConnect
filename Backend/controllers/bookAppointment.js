const Appointment = require('../models/Appointment');
const mailSender = require('../utilities/mailSender');
const {Department} = require('../models/Department');
const User  = require('../models/User');
const Hospital = require('../models/Hospital');
exports.bookAppointment =  async (req,res)=>{

    try{

        const {patientEmail,hospitalName,state,district,departmentName,date} = req.body;
        // console.log(patientEmail,hospitalName,state,district,departmentName,date);
        //authentication middleware will automatically check is user valid and a patient;
        //is date available?? no other appointments are there //will be done prior to appointment

        // send mail ki your appointment is pending for approval
        // send mail when appointment is approved;
        const patientData = await User.findOne({email:patientEmail});
        const hospitalData = await Hospital.findOne({Hospital_Name:hospitalName,State:state,District:district});
        // console.log(hospitalData._id.toHexString().toString());
        const hospitalid = hospitalData._id.toHexString();
        // console.log(typeof hospitalid);
        const departmentData = await Department.findOne({name:departmentName,HospitalId:hospitalid});
        const newAppointment = await Appointment.create({
            patient:patientData._id,
            hospital:hospitalData._id,
            department:departmentData._id,
            date:date,
            status:"Scheduled"
        });

        const title = `Regarding your Appointment with ${hospitalData.Hospital_Name} and Department ${departmentData.name}`;
        const body = `Hi, ${patientData.name} <br> <p>Your Appointment with ${departmentData.name} at ${hospitalData.Hospital_Name} has send for approval</p><br> You will get approval mail shortly`
        //email,title,body

        await mailSender(patientData.email,title,body);
        return res.status(200).json({
            success:true,
            message:"Email Send Successfully"
        });

    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to Book Appointment, Try again after some time"
        })
    }
}