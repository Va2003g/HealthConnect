const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Kindly provide complete details.",
      });
    }

    let existedUser = await User.findOne({ email });
    console.log(existedUser);
    if (!existedUser) {
      return res.status(400).json({
        success: false,
        message: "Sorry!! Kindly signup first.",
      });
    }

    const payLoad = {
      email: existedUser.email,
      role: existedUser.role,
      id: existedUser._id,
    };

    if (await bcrypt.compare(password, existedUser.password)) {
      //making jwt token to send along cookies.
      let authToken = jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      const options = {
        expires: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000 /*time in millisecond*/
        ),
        httpOnly: true,
      };

      return res
        .cookie("authToken", authToken, options)
        .status(200)
        .json({
          success: true,
          name: existedUser.name,
          role: existedUser.role,
          id: existedUser._id,
          message: `${existedUser.name} logged successfully`,
          authToken,
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Can't able to sign up. Try after some time.",
    });
  }
};
