import app from '../../../app';
import request from 'supertest';

describe('POST ENDPOINT', () => {
  it('Should be defined', async () => {
    const res = await request(app).post('/api/v1/teams');
    expect(res.status).not.toBe(404);
  });

  it('Should return error if no data is sent', async () => {
    const res = await request(app).post('/api/v1/teams');
    expect(res.status).toBe(400);
  });

  it('Should return error if invalid data is sent', async () => {
    const res = await request(app)
      .post('/api/v1/teams')
      .send({
        name: 'Manchester United',
        manager: 'Adedayo ',
        league: 'EPL'
      });
    expect(res.status).toBe(400);
  });
});
