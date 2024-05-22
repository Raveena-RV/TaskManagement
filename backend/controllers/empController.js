const employee = require("../models/employee");
const task = require("../models/task");
const bcrypt = require("bcrypt");

//for set employee account here is the setEmployee method
// const setEmployee = async (req, res) => {
//   console.log("works");
//   let data = await new employee(req.body);
//   data.save().then((data) => {
//     console.log(data);
//     res.json(data);
//   });
// };
const setEmployee = async (req, res) => {
  try {
    const newEmployee = await new employee(req.body);
    const savedEmployee = await newEmployee.save();
    console.log("New employee created:", savedEmployee);
    res.status(201).json(savedEmployee); // Respond with the saved employee details
  } catch (error) {
    console.error("Error while setting employee:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//Employee login authentication method
const employeeLogin = async (req, res) => {
  //checker is a callback function for password comparing
  const checker = (err, isMatch) => {
    if (isMatch) {
      res.json({ employeelogin: true, message: "login successfull", userData });
    } else {
      res.send({ employeelogin: false, message: "password was incorrect" });
    }
  };
  let userData = await employee.findOne({ employee_id: req.body.employee_id });
  if (userData) {
    userData.comparePassword(req.body.password, checker);
  } else {
    res.send({ employeelogin: false, message: "User Not Found" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    let data = await employee.findByIdAndDelete(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    await task.updateMany({ assign: data._id }, { $set: { assign: null } });
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getemployee = async (req, res) => {
  let data = await employee.find();
  res.json(data);
};

module.exports = {
  setEmployee,
  employeeLogin,
  deleteEmployee,
  getemployee,
};
