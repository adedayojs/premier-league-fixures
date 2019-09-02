import request from 'supertest';

import app from './app';

describe('Server', () => {
  test('Has a /api endpoint', () => {
    return request(app)
      .get('/api')
      .expect('Content-Type', /json/);
  });
});
