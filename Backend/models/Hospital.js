const mongoose = require('mongoose');
const Department = require('./Department');
const hospitalSchema = new mongoose.Schema({
    Sr_No: Number,
    Location_Coordinates: String,
    Location: String,
    Hospital_Name: String,
    State: String,
    District: String,
    Pincode: String,
    Telephone: String,
    State_ID: String,
    District_ID: String,
});

module.exports = mongoose.model("Hospital",hospitalSchema);