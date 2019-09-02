import app from '../../../app';
import request from 'supertest';

describe('POST ENDPOINT', () => {
  it('Should be defined', async () => {
    const res = await request(app).post('/api/v1/teams');
    expect(res.status).not.toBe(404);
  });
});
