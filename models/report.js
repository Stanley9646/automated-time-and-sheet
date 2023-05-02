const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  employeeId:{ type: Number },
  startDate: {type: String},
endDate : {type: String},
hoursWorked : {type: String},
payRate : {type: Number},
totalPay : { type : Number}
});

module.exports = mongoose.model('Report', reportSchema);
