const User = require('../models/User');

const Show_Doctors = async (req, res) => {
    try {
        // Call your function to fetch doctors
        const doctorUsers = await User.find({ role: 'doctor' });
        
        // Send the list of doctors as a response
        res.json(doctorUsers);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
};

module.exports = {
  Show_Doctors
};

