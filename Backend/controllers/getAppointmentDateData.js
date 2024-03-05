const { Department, Availability } = require("../models/Department");
const Hospital = require('../models/Hospital')
const moment = require('moment');
function generateMonthlyAvailability(year, month) {
    const today = moment()
      .year(year)
      .month(month - 1);
    const daysInMonth = today.daysInMonth();
    const monthlyAvailability = [];
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = today.date(i).startOf("day").toDate();
      const formattedDate = today.date(i).format("YYYY-MM-DD");
      const temp = new Availability({
        DOA: formattedDate,
        appointmentsLeft: 8,
      });
      monthlyAvailability.push(temp);
    }
  
    return monthlyAvailability;
}

exports.getAppointmentDateData = async (req, res) => {
  try {
    const {hospitalName,state,district,departmentName, month, year } = await JSON.parse(req.query.data);
    console.log(req.query);
    // console.log(req.query.data.json());
    console.log(hospitalName,state,district,departmentName, month, year);
    // console.log(typeof HospitalId);
    const hospitalData = await Hospital.findOne({Hospital_Name:hospitalName,State:state,District:district});
    const HospitalId = hospitalData._id;
    const Data = await Department.findOne({ HospitalId, name:departmentName });

    console.log(Data);
    // console.log(Data.Availability);
    
    if (Data == null) {
        //there is no entry for this hospitalid and department so creating new one
      //generate all dates for the current month with count
      //send
      let monthlyAvailability = generateMonthlyAvailability(year,month);
      const department = await Department.create({
        HospitalId,
        name:departmentName,
        Availability:monthlyAvailability
      });
      return res.status(200).json({
        success:true,
        message:"Creating new department entry,send availability array",
        monthlyAvailability
      })
    } else {
      try {
        // Use the find method to query appointments based on month and year
        const filteredAppointments = Data.Availability.filter((availability) => {
            const appointmentDate = new Date(availability.DOA);
            return (
              appointmentDate.getMonth()+1 === month &&
              appointmentDate.getFullYear() === year &&
              availability.appointmentsLeft > 0
            );
          });
          
          if (filteredAppointments.length === 0) {
            console.log("New Month: ",year,month);
            console.log("DataBase year month: ",Data.Availability[0].DOA);
            const newMonthDates = generateMonthlyAvailability(year,month);
            Data.Availability = newMonthDates;
            Data.save();
            // return res.status(404).json({
            //     success:false,
            //     message:"Sorry no date available for this current month"
            // });
            return res.status(200).json({
              success:true,
              message:"Following Dates are available",
              newMonthDates,
            })
          } else {
            // console.log(filteredAppointments);
            return res.status(200).json({
                success:true,
                message:"Following Dates are available",
                filteredAppointments
            })
          }

      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error fetching dates from array",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch Dates",
    });
  }
};
