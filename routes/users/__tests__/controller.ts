import request from 'supertest';
import app from '../../../app';

describe('POST ENDPOINT', () => {
  it('Should Return Bad Request If No Body Is Attached', async () => {
    const res = await request(app).post('/users');
    expect(res.status).toBe(400);
  });
  it('Should Return Bad Request If Invalid Body Is Attached', async () => {
    const data = {
      firstname: 'Adedayo',
      lastname: 'Adedunye',
      email: 'samfeolu@gmail.com'
    };
    const res = await request(app).post('/users');
    expect(res.status).toBe(400);
  });
  it('Should Create A New User', async () => {
    const data = {
      firstname: 'Adedayo',
      lastname: 'Adedunye',
      email: 'samfeolu@gmail.com',
      role: 'ADMIN'
    };
    const res = await request(app)
      .post('/users')
      .send(data);
    expect(res.status).toBe(201);
  });
  it('Should Return Bad Request If Already Used Email Is Attached', async () => {
    const data = {
      firstname: 'Adedayo',
      lastname: 'Adedunye',
      email: 'samfeolu@gmail.com',
      role: 'ADMIN'
    };
    const res = await request(app)
      .post('/users')
      .send(data);
    expect(res.status).toBe(400);
  });
});
