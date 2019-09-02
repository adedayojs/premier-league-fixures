import request from 'supertest';
import app from '../../../app';
import User from '../../../models/user';
import mongoose from 'mongoose';

describe('POST ENDPOINT', () => {
  const data = {
    firstname: 'Adedayo',
    lastname: 'Adedunye',
    email: 'samfeolu@gmail.com',
    role: 'ADMIN'
  };
  afterAll(async () => {
    await User.deleteMany({ email: 'samfeolu@gmail.com' });
    mongoose.connection.close();
  });

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
