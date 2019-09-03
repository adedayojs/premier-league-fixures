import app from '../../../app';
import request from 'supertest';
import Team from '../../../models/team';
import mongoose from 'mongoose';

describe('POST ENDPOINT', () => {
  afterAll(async () => {
    await Team.deleteMany({ name: 'Manchester United' });
    mongoose.connection.close();
  });

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
        league: 'EPL',

      });
    console.log(res.body);
    expect(res.status).toBe(400);
  });
  it('Should return response 201 if valid data is sent', async () => {
    const res = await request(app)
      .post('/api/v1/teams')
      .send({
        name: 'Manchester United',
        manager: 'Adedayo ',
        league: 'EPL',
        fixtures: [
          { team: 'Chelsea Fc', date: new Date(2019, 3, 15), location: 'home' },
          { team: 'Arsenal Fc', date: new Date(2019, 4, 15), location: 'home' }
        ]
      });
    console.log(res.body);
    expect(res.status).toBe(201);
  });
});
