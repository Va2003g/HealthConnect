const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    // Fetching data from request body
    const {
      FirstName,
      LastName,
      Email,
      Password,
      ConfirmPassword,
      accountType,
      speciality,
    } = req.body;

    const name = FirstName + " " + LastName;
    console.log(Email);

    if (Password != ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const userFind = await User.findOne({ email: Email });
    console.log(userFind);
    if (userFind) {
      return res.status(400).json({
        success: false,
        message: "You are already registered with us",
      });
    }

    let encryptedPassword;

    try {
      encryptedPassword = await bcrypt.hash(Password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Check if the account type is a doctor and set speciality accordingly
    const newUserFields = {
      name,
      email: Email,
      password: encryptedPassword,
      role: accountType,
      speciality: accountType === "Doctor" ? (speciality || null) : null, // If speciality is empty, set it to null
    };

    const newUser = await User.create(newUserFields); // Creating new user in the database

    return res.status(200).json({
      success: true,
      id : newUser._id,
      message: `Welcome to Health Connect ${name}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error in signing up. Try after some time",
    });
  }
};
