const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
