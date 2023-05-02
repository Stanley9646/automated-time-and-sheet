const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const User = require('../models/user');

describe('User Controller', () => {
    let user;
    let token;
  
    beforeEach(async () => {
      user = new User({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password',
        role: 'non-admin'
      });
      await user.save();
  
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password'
        });
      token = res.body.token;
    });
  
    afterEach(async () => {
      await User.deleteMany({});
    });
  
    describe('Clock In', () => {
      it('should update user clock in time', async () => {
        const res = await request(app)
          .post('/user/clockIn')
          .set('Authorization', `Bearer ${token}`);
  
        expect(res.status).toBe(200);
        expect(res.text).toMatch(/Clocked in at/);
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.clockIn).toBeDefined();
      });
    });
  
    describe('Start Break', () => {
      it('should update user break start time', async () => {
        const res = await request(app)
          .post('/user/startBreak')
          .set('Authorization', `Bearer ${token}`);
  
        expect(res.status).toBe(200);
        expect(res.text).toMatch(/Break started at/);
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.breakStart).toBeDefined();
      });
    });
  
    describe('End Break', () => {
      it('should update user break end time', async () => {
        const res = await request(app)
          .post('/user/endBreak')
          .set('Authorization', `Bearer ${token}`);
  
        expect(res.status).toBe(200);
        expect(res.text).toMatch(/Break ended at/);
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.breakEnd).toBeDefined();
      });
    });
  
    describe('Clock Out', () => {
      it('should update user clock out time', async () => {
        const res = await request(app)
          .post('/user/clockOut')
          .set('Authorization', `Bearer ${token}`);
  
        expect(res.status).toBe(200);
        expect(res.text).toMatch(/Clocked out at/);
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.clockOut).toBeDefined();
      });
    });
  });
  