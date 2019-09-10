import request from 'supertest';
import app from '../../../app';
import User from '../../../models/user';
import mongoose from 'mongoose';

describe('POST ENDPOINT', () => {
  const data = {
    firstname: 'Test Dayovic',
    lastname: 'Adedunye',
    email: 'dayovic@gmail.com',
    password: 'thelordismyshepherd',
    role: 'ADMIN'
  };

  afterAll(async () => {
    await User.deleteOne({ email: 'dayovic@gmail.com' });
    await mongoose.connection.close();
  });

  describe('Creation of User', () => {
    it('Should Return Bad Request If No Body Is Attached', async () => {
      const res = await request(app).post('/api/v1/users');
      expect(res.status).toBe(400);
    });

    it('Should Return Bad Request If Invalid Body Is Attached', async () => {
      const data = {
        firstname: 'Adedayo',
        lastname: 'Adedunye',
        email: 'samfeolu@gmail.com'
      };
      const res = await request(app)
        .post('/api/v1/users')
        .send(data);
      expect(res.status).toBe(400);
    });

    it('Should Create A New User', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send(data);
      expect(res.status).toBe(201);
    }, 7000);

    it('Should Return Bad Request If Already Used Email Is Attached', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send(data);
      expect(res.status).toBe(400);
    }, 7000);
  });

  describe('Logging In Of User or Admin', () => {
    it('Login Endpoint Should Be defined', async () => {
      const res = await request(app).post('/api/v1/users/login');
      expect(res.status).not.toBe(404);
    });

    it('Login Endpoint Should return bad request if data is not sent', async () => {
      const res = await request(app).post('/api/v1/users/login');
      expect(res.status).toBe(400);
    });

    it('Login Endpoint Should return 404 if user is not existing', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ password: '123', role: 'ADMIN', email: 'test bobade@gmail.com' });
      expect(res.status).toBe(404);
    });

    it('Login Endpoint Should return bad request if wrong password is sent', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'dayovic@gmail.com', password: 'wrongpassword', role: 'ADMIN' });
      expect(res.status).toBe(400);
    });

    it('Login Endpoint Should return payload and success if required data sent', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: 'dayovic@gmail.com', password: 'thelordismyshepherd', role: 'ADMIN' });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.password).not.toBeDefined();
    });
  });
});
