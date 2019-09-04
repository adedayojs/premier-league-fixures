import mongoose, { Document, Schema } from 'mongoose';
import { ITeam } from './team';

export interface IFixture extends Document {
  homeTeam: string | ITeam;
  awayTeam: string | ITeam;
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
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  awayTeam: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Team'
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
