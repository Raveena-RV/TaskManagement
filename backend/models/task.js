const mongoose = require('mongoose');
const moment = require('moment');

const taskSchema = new mongoose.Schema({
  title: String,
  discription: String,
  startdate: Date,
  enddate: Date,
  assign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee"
  },
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed'],
    default: 'Pending',
  },
});

// Define virtuals to format dates
taskSchema.virtual('formattedStartdate').get(function () {
  return moment(this.startdate).format('DD MMMM YYYY');
});
//The "moment" library is used to format the dates.

taskSchema.virtual('formattedEnddate').get(function () {
  return moment(this.enddate).format('DD MMMM YYYY');
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
