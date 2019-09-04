import app from '../../../app';
import request from 'supertest';
import Team, { ITeam } from '../../../models/team';
import mongoose from 'mongoose';

afterAll(async () => {
  await Team.deleteMany({ name: 'Manchester United' });
  await mongoose.connection.close();
});

describe('POST ENDPOINT', () => {
  afterAll(async () => {
    await Team.deleteMany({ name: 'Manchester United' });
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
        league: 'EPL'
      });
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
    expect(res.status).toBe(201);
  });
});

describe('GET ENDPOINT', () => {
  afterAll(async () => {
    await Team.deleteMany({ name: 'Manchester United' });
  });
  it('should be defined', async () => {
    const res = await request(app).get('/api/v1/teams');
    expect(res.status).not.toBe(404);
  });

  it('should return a created team', async () => {
    const team = await new Team({
      name: 'Manchester United',
      manager: 'Adedayo ',
      league: 'EPL',
      fixtures: [
        { team: 'Chelsea Fc', date: new Date(2019, 3, 15), location: 'home' },
        { team: 'Arsenal Fc', date: new Date(2019, 4, 15), location: 'home' }
      ]
    }).save();
    const res = await request(app).get('/api/v1/teams');
    expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: team.name })]));
  });
});

describe('PUT ENDPOINT', () => {
  let team: ITeam;
  beforeAll(async () => {
    team = await new Team({
      name: 'Manchester United',
      manager: 'Adedayo ',
      league: 'EPL',
      fixtures: [
        { team: 'Chelsea Fc', date: new Date(2019, 3, 15), location: 'home' },
        { team: 'Arsenal Fc', date: new Date(2019, 4, 15), location: 'home' }
      ]
    }).save();
  });

  afterAll(async () => {
    await Team.deleteMany({ name: 'Manchester United' });
  });

  it('Should be defined', async () => {
    const res = await request(app).put(`/api/v1/teams/${team._id}`);
    expect(res.status).not.toBe(404);
  });

  it('Should be return bad request if any required field is not present', async () => {
    const res = await request(app)
      .put(`/api/v1/teams/${team._id}`)
      .send({ name: 'Manchester United', manager: 'Adedayo ', league: 'EPL' });
    expect(res.status).toBe(400);
  });

  it('Should be return success if all required fields are present', async () => {
    const res = await request(app)
      .put(`/api/v1/teams/${team._id}`)
      .send({
        name: 'Manchester United',
        manager: 'Robert',
        league: 'EPL',
        fixtures: [
          { team: 'Chelsea Fc', date: new Date(2019, 3, 15), location: 'home' },
          { team: 'Arsenal Fc', date: new Date(2019, 4, 15), location: 'home' },
          { team: 'Liverpool Fc', date: new Date(2019, 5, 15), location: 'away' }
        ]
      });
    expect(res.status).toBe(200);
    expect(res.body.manager).toBe('Robert');
    expect(res.body.fixtures.length).toBe(3);
  });
});

describe('DELETE ENDPOINT', () => {
  let team: ITeam;
  beforeEach(async () => {
    team = await new Team({
      name: 'Manchester United',
      manager: 'Adedayo ',
      league: 'EPL',
      fixtures: [
        { team: 'Chelsea Fc', date: new Date(2019, 3, 15), location: 'home' },
        { team: 'Arsenal Fc', date: new Date(2019, 4, 15), location: 'home' }
      ]
    }).save();
  });

  it('Should be Defined', async () => {
    const res = await request(app).delete(`/api/v1/teams/${team._id}`);
    expect(res.status).not.toBe(404);
  });

  it('Should Not Contain Deleted Data', async () => {
    await request(app).delete(`/api/v1/teams/${team._id}`);
    const res = await Team.findById(team._id);
    expect(res).toBeNull();
  });
});
