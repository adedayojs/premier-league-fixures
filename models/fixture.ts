import mongoose, { Document, Schema } from 'mongoose';

export interface IFixtures extends Document {
  name: string;
  manager: string;
  league: string;
  established?: Date;
  formation?: string;
  owner?: string;
  fixtures: [{ team: string; date: Date; location: string }];
}
const fixtureSchema: Schema = new Schema({
  homeTeam: {
    required: true,
    unique: true,
    type: String
  },
  awayTeam: {
    required: true,
    unique: true,
    type: String
  },
  homeScore: {
    required: true,
    type: Number,
    default: 0
  },
  awayScore: {
    required: true,
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    required: true
  },
  stadium: {
    type: String,
    required: true
  },
  referee: {
    type: String,
    required: true
  }
});

export default mongoose.model<IFixtures>('Fixture', fixtureSchema);
