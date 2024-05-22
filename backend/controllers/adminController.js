const admin = require("../models/admin");
const bcrypt = require("bcrypt");

//for set admin account here is the setAdmin method
const setAdmin = async (req, res) => {
  try {
    const newAdmin = await new admin(req.body);
    const savedAdmin = await newAdmin.save();
    console.log("New admin account created:", savedAdmin);
    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error("Error while setting admin account:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const adminStaticEmail = "admin@gmail.com";
const adminStaticPassword = "admin123";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === adminStaticEmail && password === adminStaticPassword) {
      res.json({ adminlogin: true, message: "Login successful" });
    } else {
      res.json({ adminlogin: false, message: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res
      .status(500)
      .json({ adminlogin: false, message: "Internal server error" });
  }
};

module.exports = { setAdmin, adminLogin };
