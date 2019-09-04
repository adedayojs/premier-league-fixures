import express from 'express';
import Fixture from '../../models/fixture';
import { validateFixture } from '../../helpers/joi-validator';
import validateFixtureInDatabase from '../../helpers/team-in-database-validator';

async function createFixture(req: express.Request, res: express.Response) {
  /*  Check the incoming data to make sure that required fields exist
         return error if they don't exist 
         */
  const { error } = validateFixture(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  /* Check that the teams to be put in fixtures exists in the database,
   return error if they don't exist in the database
*/
  const isInDatabase = await validateFixtureInDatabase([req.body.homeTeam, req.body.awayTeam]);
  if (!isInDatabase) {
    res.status(400).json({ error: 'Team(s) Does Not Exist in Database' });
    return;
  }
  /* Create fixture since all data are present and valid, handle any error that may occur */
  const fixture = await new Fixture(req.body).save().catch(err => {
    res.status(500).json(err);
  });
  res.status(201).json(fixture);
}

export { createFixture };
