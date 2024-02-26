const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,//will help to save data in proper order ignoring spaces:- "hello "," hello " all are "hello"
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:true,
        trim:true,
        Unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("user",userSchema);