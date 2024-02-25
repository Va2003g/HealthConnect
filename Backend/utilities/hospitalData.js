const express = require('express');
const multer = require('multer');
const exceljs = require('exceljs');
const Hospital = require('../models/Hospital');
const mongoose = require('mongoose');

const app = express();
const port = 3001;
const mongoUrl = 'mongodb+srv://vanshgupta4661:0Z9BYdtSSDLginN3@cluster0.mppib6t.mongodb.net/UsersDataBase';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const workbook = new exceljs.Workbook();
  const buffer = req.file.buffer;

  try {
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(1);
    const data = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          return;
        }
        const rowData = {
          Sr_No: row.getCell(1).value,
          Location_Coordinates: row.getCell(2).value,
          Location: row.getCell(3).value,
          Hospital_Name: row.getCell(4).value,
          State: row.getCell(5).value,
          District: row.getCell(6).value,
          Pincode: row.getCell(7).value,
          Telephone: row.getCell(8).value,
          State_ID: row.getCell(9).value,
          District_ID: row.getCell(10).value,
        };
        data.push(rowData);
      });
    await Hospital.insertMany(data);
    res.json({ message: 'File uploaded and data saved to MongoDB' });
  } catch (error) {
    console.error('Error processing Excel file:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
