import app from '../../../app';
import request from 'supertest';
import Fixture, { IFixture } from '../../../models/fixture';
import Team, { ITeam } from '../../../models/team';
import mongoose from 'mongoose';

afterAll(async () => {
  await Team.deleteMany({ league: 'EPL' });
  await mongoose.connection.close();
});
let team1: ITeam;
let team2: ITeam;

beforeAll(async () => {
  team1 = await new Team({
    _id: mongoose.Types.ObjectId(),
    name: 'Manchester United',
    manager: 'Adedayo ',
    league: 'EPL',
    fixtures: [
      { team: 'Chelsea Fc', date: new Date(2019, 3, 15), location: 'home' },
      { team: 'Arsenal Fc', date: new Date(2019, 4, 15), location: 'home' }
    ]
  }).save();

  team2 = await new Team({
    _id: mongoose.Types.ObjectId(),
    name: 'Manchester City',
    manager: 'AdedayoJs ',
    league: 'EPL',
    fixtures: [
      { team: 'Chelsea Fc', date: new Date(2019, 4, 15), location: 'home' },
      { team: 'Arsenal Fc', date: new Date(2019, 4, 8), location: 'home' }
    ]
  }).save();
});
describe('POST ENDPOINT', () => {
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
  it('Should return response 500 if bad data is sent', async () => {
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
    expect(res.status).toBe(500);
  });
  it('Should return response 201 if valid data is sent', async () => {
    const res = await request(app)
      .post('/api/v1/fixtures')
      .send({
        homeTeam: team1._id,
        awayTeam: team2._id,
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
  it('should be defined', async () => {
    const res = await request(app).get('/api/v1/fixtures');
    expect(res.status).not.toBe(404);
  });

  it('should return a created fixture', async () => {
    const res = await request(app).get('/api/v1/fixtures');
    expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ stadium: 'Old Trafford' })]));
  });
});

describe('PUT ENDPOINT', () => {
  let fixture: IFixture;
  beforeAll(async () => {
    fixture = await new Fixture({
      homeTeam: team2._id,
      awayTeam: team1._id,
      homeScore: 7,
      awayScore: 3,
      date: new Date(2019, 3, 10, 18, 25, 0),
      stadium: 'Old Trafford',
      referee: 'Kazuki Ito',
      isPending: true
    }).save();
  });

  afterAll(async () => {
    await Fixture.deleteMany({ homeTeam: team2._id });
  });

  it('Should be defined', async () => {
    const res = await request(app).put(`/api/v1/fixtures/${fixture._id}`);
    expect(res.status).not.toBe(404);
  });

  it('Should be return server error if invalid object id is provided is not present', async () => {
    const res = await request(app)
      .put(`/api/v1/fixtures/${fixture._id}`)
      .send({
        homeTeam: 'team2._id',
        awayTeam: 'team1._id',
        homeScore: 5,
        awayScore: 3,
        date: new Date(2019, 3, 10, 18, 25, 0),
        stadium: 'Stamford Bridge',
        referee: 'Kazuki Ito',
        isPending: false
      });
    expect(res.status).toBe(500);
  });

  it('Should be return success if all required fields are present', async () => {
    const res = await request(app)
      .put(`/api/v1/fixtures/${fixture._id}`)
      .send({
        homeTeam: team2._id,
        awayTeam: team1._id,
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
      homeTeam: team2._id,
      awayTeam: team1._id,
      homeScore: 7,
      awayScore: 3,
      date: new Date(2019, 3, 10, 18, 25, 0),
      stadium: 'Old Trafford',
      referee: 'Kazuki Ito',
      isPending: true
    }).save();
  });

  afterAll(async () => {
    await Fixture.deleteMany({ homeTeam: team2._id });
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
