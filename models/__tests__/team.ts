import mongoose from 'mongoose';
import Team from '../team';
import dotenv from 'dotenv';
dotenv.config();

let env = `${process.env.NODE_ENV}`;

env = process.env.NODE_ENV || 'DEVELOPMENT';

let envString = env.toUpperCase();

// Connection to mongoDB

const uri = `${process.env[`ATLAS_URI_${envString}`]}`;

mongoose.set('useFindAndModify', false);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.on('error', () => {
  console.log('Error Connecting To Database');
});

const teamObject = {
  _id: new mongoose.Types.ObjectId().toHexString(),
  name: 'Manchester United FC',
  manager: 'Alexander Ferguson',
  league: 'English Premier League'
};
const team = new Team(teamObject);

let result: any;
beforeAll(async () => {
  result = await team.save();
});

afterAll(async () => {
  await Team.findByIdAndDelete(result._id);
  await mongoose.connection.close();
});

describe('Team model test', () => {
  test('Team has a module', () => {
    expect(Team).toBeDefined();
  });

  describe('Get Team Object from Model', () => {
    it('should get a Team', () => {
      expect(team.name).toBe(teamObject.name);
      expect(team.manager).toBe(teamObject.manager);
      expect(team.league).toBe(teamObject.league);
    });
  });

  describe('Get Team Object from Database', () => {
    it('should Get a Team', () => {
      expect(result.name).toBe(teamObject.name);
      expect(result.manager).toBe(teamObject.manager);
      expect(result.league).toBe(teamObject.league);
    });
  });
});
