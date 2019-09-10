import app from '../../../app';
import request from 'supertest';
import Team, { ITeam } from '../../../models/team';
import mongoose from 'mongoose';

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST ENDPOINT', () => {
  afterAll(async () => {
    await Team.deleteOne({ manager: 'Zidane' });
  });

  it('Should be defined', async () => {
    const res = await request(app).post('/api/v1/teams');
    expect(res.status).not.toBe(404);
  });

  it('Should return error if no token is sent', async () => {
    const res = await request(app).post('/api/v1/teams');
    expect(res.status).toBe(401);
  });

  it('Should return error if no data is sent', async () => {
    const res = await request(app)
      .post('/api/v1/teams')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWZlb2x1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY3NTY0MDU5fQ.oj8nb4EOW2ZH7WheIcna0L_s2IM9hOeu46JHRZy5LV0'
      );
    expect(res.status).toBe(400);
  });

  it('Should return error if invalid data is sent', async () => {
    const res = await request(app)
      .post('/api/v1/teams')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWZlb2x1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY3NTY0MDU5fQ.oj8nb4EOW2ZH7WheIcna0L_s2IM9hOeu46JHRZy5LV0'
      )
      .send({
        name: 'Manchester United',
        manager: 'Adedayo ',
        league: 'EPL'
      });
    expect(res.status).toBe(400);
  });

  it('Should return response 201 if valid data is sent', async () => {
    const res = await request(app)
      .post('/api/v1/teams')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWZlb2x1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY3NTY0MDU5fQ.oj8nb4EOW2ZH7WheIcna0L_s2IM9hOeu46JHRZy5LV0'
      )
      .send({
        name: 'Real Madrid',
        manager: 'Zidane ',
        league: 'Spanish La Liga',
        fixtures: [
          { team: '5d4155cfcd68f4086d8df500', date: new Date(2019, 3, 15), location: 'home' },
          { team: '5d4155cfcd68f4086d8df505', date: new Date(2019, 4, 15), location: 'home' }
        ]
      });
    expect(res.status).toBe(201);
  });
});

describe('GET ENDPOINT', () => {
  afterAll(async () => {
    await Team.deleteOne({ manager: 'Aded' });
  });

  it('should return a created team', async () => {
    const team = await new Team({
      name: 'Random United',
      manager: 'Aded ',
      league: 'EPL',
      fixtures: [
        { team: '5d4155cfcd68f4086d8df500', date: new Date(2019, 3, 15), location: 'home' },
        { team: '5d4155cfcd68f4086d8df500', date: new Date(2019, 4, 15), location: 'home' }
      ]
    }).save();
    const res = await request(app).get('/api/v1/teams');
    expect(res.body).toHaveProperty(
      'data',
      expect.arrayContaining([expect.objectContaining({ name: team.name })])
    );
  });
});

describe('PUT ENDPOINT', () => {
  it('Should be defined', async () => {
    const res = await request(app).put(`/api/v1/teams/5d4155cfcd68f4086d8df504`);
    expect(res.status).not.toBe(404);
  });

  it('Should return bad request if any required field is not present', async () => {
    const res = await request(app)
      .put(`/api/v1/teams/5d4155cfcd68f4086d8df504`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWZlb2x1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY3NTY0MDU5fQ.oj8nb4EOW2ZH7WheIcna0L_s2IM9hOeu46JHRZy5LV0'
      )
      .send({ name: 'Manchester United', manager: 'Adedayo ', league: 'EPL' });
    expect(res.status).toBe(400);
  });

  it('Should return success if all required fields are present', async () => {
    const res = await request(app)
      .put(`/api/v1/teams/5d4155cfcd68f4086d8df504`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWZlb2x1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY3NTY0MDU5fQ.oj8nb4EOW2ZH7WheIcna0L_s2IM9hOeu46JHRZy5LV0'
      )
      .send({
        name: 'Westbrom Football United',
        manager: 'Robert',
        league: 'EPL',
        fixtures: [
          { team: '5d4155cfcd68f4086d8df503', date: new Date(2019, 3, 15), location: 'home' },
          { team: '5d4155cfcd68f4086d8df502', date: new Date(2019, 4, 15), location: 'home' },
          { team: '5d4155cfcd68f4086d8df506', date: new Date(2019, 5, 15), location: 'away' }
        ]
      });
    console.log('This is the response', res.error, res.body);
    expect(res.status).toBe(200);
    expect(res.body.manager).toBe('Robert');
    expect(res.body.fixtures.length).toBe(3);
  });
});

describe('DELETE ENDPOINT', () => {
  it('Should be Defined', async () => {
    const res = await request(app)
      .delete(`/api/v1/teams/5d4155cfcd68f4086d8df505`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWZlb2x1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY3NTY0MDU5fQ.oj8nb4EOW2ZH7WheIcna0L_s2IM9hOeu46JHRZy5LV0'
      );
    expect(res.status).not.toBe(404);
  });

  it('Should Not Contain Deleted Data', async () => {
    await request(app)
      .delete(`/api/v1/teams/5d4155cfcd68f4086d8df502`)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWZlb2x1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTY3NTY0MDU5fQ.oj8nb4EOW2ZH7WheIcna0L_s2IM9hOeu46JHRZy5LV0'
      );
    const res = await Team.findById('5d4155cfcd68f4086d8df502');
    expect(res).toBeNull();
  });
});
