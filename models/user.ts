import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  club?: string;
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: [25, 'User first name must have less or equal to 25 characters']
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [25, 'User last name must have less or equal to 25 characters']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User should have email']
  },
  password: {
    type: String
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: {
      values: ['ADMIN', 'USER'],
      message: 'role is either: ADMIN, or USER'
    },
    required: [true, 'User should have a role']
  },
  club: String
});

export default mongoose.model<IUser>('User', userSchema);
