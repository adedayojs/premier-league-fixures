import mongoose, { Document, Schema } from 'mongoose';

export interface IFixture extends Document {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: Date;
  stadium: string;
  referee: string;
  isPending: boolean;
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
  },
  isPending: {
    type: Boolean,
    required: true,
    default: true
  }
});

export default mongoose.model<IFixture>('Fixture', fixtureSchema);
