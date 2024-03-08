const User = require("../models/User");
const mongoose = require("mongoose");

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.query;

    // Check if id is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provide Id of the User",
      });
    }

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id provided",
      });
    }

    // Find user by id
    const userDetails = await User.findById(id);

    // If user not found, return 404
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user details
    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (err) {
    console.error("Error fetching user details:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the details of the user",
    });
  }
};
