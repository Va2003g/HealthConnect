const User = require("../models/User");

const ShowDoctors = async (req, res) => {
  // Capitalized "Doctors" for consistency with function name
  try {
    // Call your function to fetch doctors (use camelCase for function names)
    const doctorUsers = await User.find({ role: /doctor/i }); // "i" flag for case-insensitive

    // Send the list of doctors as a response
    res.json(doctorUsers);
  } catch (error) {
    // Handle any errors
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

module.exports = {
  ShowDoctors, // Capitalized "Doctors" for consistency
};
