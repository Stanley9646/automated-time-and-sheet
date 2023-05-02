const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Admin controller', function() {

  // Test suite for adding a new employee
  describe('Add new employee', function() {
    it('should return a 201 status code and success message', function(done) {
      chai.request(app)
        .post('/admin/addEmployee')
        .send({ name: 'John Doe', position: 'Developer', salary: 50000 })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Employee added successfully.');
          done();
        });
    });
  });

  // Test suite for modifying employee details
  describe('Modify employee details', function() {
    it('should return a 200 status code and updated employee details', function(done) {
      const employee = { name: 'Jane Doe', position: 'Designer', salary: 60000 };
      chai.request(app)
        .put('/admin/modifyEmployee/123')
        .send(employee)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.employee).to.include(employee);
          done();
        });
    });
  });

  // Test suite for generating payslip/report
  describe('Generate payslip/report', function() {
    it('should return a 200 status code and payslip/report', function(done) {
      const date = '2023-04-01';
      chai.request(app)
        .get(`/admin/generatePayslip/${date}`)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('payslip');
          done();
        });
    });
  });

});
