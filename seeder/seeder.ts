import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userSeeds from './user';
import teamSeeds from './teams';
import fixtureSeeds from './fixtures';

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

const allSeeds: any = [...fixtureSeeds, ...userSeeds, ...teamSeeds];

async function seed() {
  await mongoose.connection.dropDatabase();

  let counter = 0;
  for (let index = 0; index < allSeeds.length; index++) {
    //Saving each Section to database
    allSeeds[index].save((error: any, _result: any) => {
      if (error) {
        console.log(error);
      }

      counter++;
      if (counter === allSeeds.length) {
        //Disconnect if this is the last seed
        mongoose.disconnect();
      }
    });
  }
}
seed();
