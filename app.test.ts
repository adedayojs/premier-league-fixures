import request from 'supertest';
import app from './app';
import mongoose from 'mongoose'

afterAll(()=>{
    mongoose.connection.close()
})
describe('Server', () => {
  test('Has a /api endpoint', () => {
    return request(app)
      .get('/api/v1')
      .expect('Content-Type', /json/);
  });
});
