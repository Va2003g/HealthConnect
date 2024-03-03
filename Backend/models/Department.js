const mongoose  = require('mongoose');
const Hospital = require('./Hospital');
const AvailabilitySchema = new mongoose.Schema({
    DOA: { 
        type: Date, 
        required: true 
    },
    appointmentsLeft: { 
        type: Number, 
        default: 8 
    },
});

const departmentSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    HospitalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hospital'
    },
    Availability:[AvailabilitySchema],
})

// module.exports = mongoose.model('Department',departmentSchema)
// module.exports = mongoose.model('Availability',AvailabilitySchema)

const Department = mongoose.model('Department', departmentSchema);
const Availability = mongoose.model('Availability', AvailabilitySchema);

module.exports = {
    Department,
    Availability,
};