import request from 'supertest';
import app from '../../../app';
import User from '../../../models/user';
import mongoose from 'mongoose';

describe('POST ENDPOINT', () => {
  const data = {
    firstname: 'Adedayo',
    lastname: 'Adedunye',
    email: 'samfeolu@gmail.com',
    password:'thelordismyshepherd',
    role: 'ADMIN'
  };
  afterAll(async () => {
    await User.deleteMany({ email: 'samfeolu@gmail.com' });
    mongoose.connection.close();
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
      const res = await request(app).post('/api/v1/users');
      expect(res.status).toBe(400);
    });
    it('Should Create A New User', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send(data);
      expect(res.status).toBe(201);
    });
    it('Should Return Bad Request If Already Used Email Is Attached', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send(data);
      expect(res.status).toBe(400);
    });
  });

  describe('Logging In Of User or Admin', () => {
    it('Login Endpoint Should Be defined', async () => {
      const res = await request(app).post('/api/v1/users/login');
      expect(res.status).not.toBe(404);
    });

  });
});
