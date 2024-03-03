const { Department, Availability } = require("../models/Department");
const Hospital = require("../models/Hospital");
const moment = require("moment");
const express = require("express");
const app = express();
const dbconnect = require("../config/database");
const departmentNames = [
  "General Medicine",
  "Opthamology",
  "Orthopedics",
  "Cardiology",
  "Dentistry",
];

async function helper() {
  let temp = 0;
  try {
    const cursor = Hospital.find({}).cursor();

for (let hospital = await cursor.next(); hospital != null; hospital = await cursor.next()) {
    const existingDepartments = await Department.find({ HospitalId: hospital._id });

    if (existingDepartments.length > 0) {
        console.log(`Departments already exist for Hospital with _id ${hospital._id}.`);
        continue;
    }

    await createDepartmentsForHospital(hospital._id);
    // console.log(`Departments created for Hospital with _id ${hospital._id}.`);
}

console.log('Data processing completed.');
    // for(let j = 3148;j<=30273;j++)
    // {
    //     temp = j;
    //     const data = await Hospital.find({});
    //     if(await Department.findById(data))
    //     {
    //         continue;
    //     }
    //     await createDepartmentsForHospital(data[0]._id)
    // }
    // console.log('data added successfully',temp);
    // console.log(data);
    // data.forEach
    // data.forEach(hospital => {
    // Pass hospital ID to the script to create departments
    // console.log(hospital._id);
    // .then(departments => {
    // //   console.log(`Departments for Hospital ${hospital._id}:`, departments);
    // })
    // .catch(error => {
    // console.error(`Error creating departments for Hospital ${hospital._id}:`, error);
    // });
    // });
  } catch (error) {
    console.log(temp);
    console.error("Error retrieving hospitals:", error);
  }
}
async function createDepartmentsForHospital(hospitalId) {
  const today = moment();

  const departments = [];

  for (const departmentName of departmentNames) {
    //   const existingDepartment = await Department.findOne({ name: departmentName, hospital: hospitalId });

    //   if (existingDepartment==undefined) {
    const newDepartment = await Department.create({
      name: departmentName,
      HospitalId: hospitalId,
      Availability: generateMonthlyAvailability(2024, 3),
    });

    // const temp = await new Department.save();
    departments.push(newDepartment);
  }
  //   } else {
  //     departments.push(existingDepartment);
  //   }
  // }

  // Update the hospital's 'departments' array
  // await Hospital.findByIdAndUpdate(
  //     hospitalId,
  //     { $push: { departmentId: { $each: departments.map(department => department._id) } } },
  //     { new: true }
  //   );
  return departments;
}

// Usage example: createDepartmentsForHospital('your-hospital-id');

// Helper function to generate monthly availability
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

// module.exports = helper;
