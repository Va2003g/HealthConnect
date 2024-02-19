//connecting to the database;
const mongoose = require('mongoose');
require('dotenv').config();

const DBUrl = process.env.MONGODB_URL;

function dbconnect(){
    mongoose.connect(DBUrl)
    .then(()=>console.log("DB connection Successful"))
    .catch((err)=>{
        console.log(err);
        console.log("DB connection is not successful");
        process.exit(1);
    })
};

module.exports = dbconnect;