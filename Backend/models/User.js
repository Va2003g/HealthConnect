const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
    },
    speciality: { // Field for doctor's speciality
        type: String,
        default: null, // Default value is null if not provided
    }
});

module.exports = mongoose.model("user", userSchema);
