const User = require('../models/users');
const Employee = require('../models/employee');
const Report = require('../models/report');

//handling admin tasks thats is to add employee , modify employee and generate report
exports.addEmployee = function(req, res) {
  const newEmployee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role
  });
  newEmployee.save(function(err) {
    if (err) {
      return res.status(500).send('Error on the server.');
    }
    res.send('Employee added successfully.');
  });
};

exports.modifyEmployee = function(req, res) {
  Employee.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role
  }, function(err) {
    if (err) {
      return res.status(500).send('Error on the server.');
    }
    res.send('Employee modified successfully.');
  });
};

exports.generateReport = function(req, res) {
  const report = new Report({
    employeeId: req.body.employeeId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    hoursWorked: req.body.hoursWorked,
    payRate: req.body.payRate,
    totalPay: req.body.totalPay
  });
  report.save(function(err) {
    if (err) {
      return res.status(500).send('Error on the server.');
    }
    res.send('Report generated successfully.');
  });
};
