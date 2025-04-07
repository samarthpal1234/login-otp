const mongoose = require('mongoose');

// Create the schema
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the model
const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
