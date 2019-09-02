// import request from 'supertest';
// import app from './app';

const request = require('supertest');
const app = require('./app');

describe('Server', () => {
  test('Has a /api endpoint', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /json/);
  });
});
