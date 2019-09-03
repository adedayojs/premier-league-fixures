import app from '../../../app';
import request from 'supertest';
import Fixture, { IFixture } from '../../../models/fixture';
import mongoose from 'mongoose';

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST ENDPOINT', () => {
  afterAll(async () => {
    await Fixture.deleteMany({ homeTeam: 'Manchester United' });
  });
  it('Should be defined', async () => {
    const res = await request(app).post('/api/v1/fixtures');
    expect(res.status).not.toBe(404);
  });

  it('Should return error if no data is sent', async () => {
    const res = await request(app).post('/api/v1/fixtures');
    expect(res.status).toBe(400);
  });

  it('Should return error if invalid data is sent', async () => {
    const res = await request(app)
      .post('/api/v1/fixtures')
      .send({
        name: 'Manchester United',
        manager: 'Adedayo ',
        league: 'EPL'
      });
    expect(res.status).toBe(400);
  });
  it('Should return response 201 if valid data is sent', async () => {
    const res = await request(app)
      .post('/api/v1/fixtures')
      .send({
        homeTeam: 'Manchester United',
        awayTeam: 'Manchester City',
        homeScore: 7,
        awayScore: 3,
        date: new Date(2019, 3, 10, 18, 25, 0),
        stadium: 'Old Trafford',
        referee: 'Kazuki Ito',
        isPending: true
      });
    expect(res.status).toBe(201);
  });
});

describe('GET ENDPOINT', () => {
  afterAll(async () => {
    await Fixture.deleteMany({ homeTeam: 'Manchester United' });
  });
  it('should be defined', async () => {
    const res = await request(app).get('/api/v1/fixtures');
    expect(res.status).not.toBe(404);
  });

  it('should return a created fixture', async () => {
    const fixture = await new Fixture({
      homeTeam: 'Manchester United',
      awayTeam: 'Manchester City',
      homeScore: 7,
      awayScore: 3,
      date: new Date(2019, 3, 10, 18, 25, 0),
      stadium: 'Old Trafford',
      referee: 'Kazuki Ito',
      isPending: true
    }).save();
    const res = await request(app).get('/api/v1/fixtures');
    expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: fixture.homeScore })]));
  });
});

describe('PUT ENDPOINT', () => {
  let fixture: IFixture;
  beforeAll(async () => {
    fixture = await new Fixture({
      homeTeam: 'Manchester United',
      awayTeam: 'Manchester City',
      homeScore: 7,
      awayScore: 3,
      date: new Date(2019, 3, 10, 18, 25, 0),
      stadium: 'Old Trafford',
      referee: 'Kazuki Ito',
      isPending: true
    }).save();
  });

  afterAll(async () => {
    await Fixture.deleteMany({ homeTeam: 'Manchester United' });
  });

  it('Should be defined', async () => {
    const res = await request(app).put(`/api/v1/fixtures/${fixture._id}`);
    expect(res.status).not.toBe(404);
  });

  it('Should be return bad request if any required field is not present', async () => {
    const res = await request(app)
      .put(`/api/v1/fixtures/${fixture._id}`)
      .send({ name: 'Manchester United', manager: 'Adedayo ', league: 'EPL' });
    expect(res.status).toBe(400);
  });

  it('Should be return success if all required fields are present', async () => {
    const res = await request(app)
      .put(`/api/v1/fixtures/${fixture._id}`)
      .send({
        homeTeam: 'Manchester United',
        awayTeam: 'Manchester City',
        homeScore: 5,
        awayScore: 3,
        date: new Date(2019, 3, 10, 18, 25, 0),
        stadium: 'Stamford Bridge',
        referee: 'Kazuki Ito',
        isPending: false
      });
    expect(res.status).toBe(200);
    expect(res.body.homeScore).toBe(5);
    expect(res.body.isPending).toBe(false);
  });
});

describe('DELETE ENDPOINT', () => {
  let fixture: IFixture;
  beforeEach(async () => {
    fixture = await new Fixture({
      homeTeam: 'Manchester United',
      awayTeam: 'Manchester City',
      homeScore: 7,
      awayScore: 3,
      date: new Date(2019, 3, 10, 18, 25, 0),
      stadium: 'Old Trafford',
      referee: 'Kazuki Ito',
      isPending: true
    }).save();
  });

  afterAll(async () => {
    await Fixture.deleteMany({ homeTeam: 'Manchester United' });
  });

  it('Should be Defined', async () => {
    const res = await request(app).delete(`/api/v1/fixtures/${fixture._id}`);
    expect(res.status).not.toBe(404);
  });

  it('Should Not Contain Deleted Data', async () => {
    await request(app).delete(`/api/v1/fixtures/${fixture._id}`);
    const res = await Fixture.findById(fixture._id);
    expect(res).toBeNull();
  });
});
