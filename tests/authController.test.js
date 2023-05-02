const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('AuthController', () => {
    let testUser;
  
    beforeAll(async () => {
      await mongoose.connect(process.env.DB_CONNECTION_STRING_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
  
      testUser = new User({
        email: 'testuser@example.com',
        password: 'password',
      });
  
      await testUser.save();
    });
  
    afterAll(async () => {
      await User.deleteMany();
      await mongoose.disconnect();
    });
  
    describe('POST /api/auth/login', () => {
      it('should return a JWT token on successful login', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: testUser.email,
            password: 'password',
          });
  
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
      });
  
      it('should return a 401 error for invalid login credentials', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'invalid@example.com',
            password: 'invalidpassword',
          });
  
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid email or password');
      });
    });
  
    describe('POST /api/auth/logout', () => {
      it('should return a 200 status code on successful logout', async () => {
        const response = await request(app)
          .post('/api/auth/logout')
          .set('Authorization', `Bearer ${testUser.generateAuthToken()}`);
  
        expect(response.statusCode).toBe(200);
      });
  
      it('should return a 401 error for unauthorized requests', async () => {
        const response = await request(app)
          .post('/api/auth/logout');
  
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
      });
    });
  });
  