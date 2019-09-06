import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userSeeds from './user'
import teamSeeds from './teams'
import fixtureSeeds from './fixtures'

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
connection.once('open', () => {
  console.log(`Connected to mongo @ ${uri}`);
});
connection.on('error', () => {
  console.log('Error Connecting To Database');
});

