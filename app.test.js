// import request from 'supertest';
// import app from './app';
// import mongoose from 'mongoose'

const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose')

afterAll(()=>{
    mongoose.connection.close()
})
describe('Server', () => {
  test('Has a /api endpoint', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /json/);
  });
});
