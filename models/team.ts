import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  manager: string;
  league: string;
  established?: Date;
  formation?: string;
  owner?: string;
  fixtures: [{ team: string; date: Date; location: string }];
}
const teamSchema: Schema = new Schema({
  name: {
    required: true,
    unique: true,
    type: String
  },
  manager: {
    required: true,
    unique: true,
    type: String
  },
  league: {
    required: true,
    type: String
  },
  established: Date,
  formation: String,
  owner: String,
  fixtures: {
    type: [
      {
        team: {
          type: mongoose.Types.ObjectId,
          ref: 'Team'
        },
        date: Date,
        location: String
      }
    ],
    required: true
  }
});

export default mongoose.model<ITeam>('Team', teamSchema);
