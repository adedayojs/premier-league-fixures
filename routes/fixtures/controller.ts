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
  const isInDatabase = await validateFixtureInDatabase([req.body.homeFixture, req.body.awayFixture]);
  if (!isInDatabase) {
    res.status(400).json({ error: 'Fixture(s) Does Not Exist in Database' });
    return;
  }
  /* Create fixture since all data are present and valid, handle any error that may occur */
  const fixture = await new Fixture(req.body).save().catch(err => {
    res
      .status(500)
      .send(err)
      .end();
  });
  res.status(201).json(fixture);
}

async function viewFixtures(req: express.Request, res: express.Response) {
  const fixture = await Fixture.find({}).catch(err => {
    res
      .status(500)
      .send(err)
      .end();
  });
  res.json(fixture);

  return;
}

async function editFixture(req: express.Request, res: express.Response) {
  //  Validate to make sure that the required parameters are supplied
  const { error } = validateFixture(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }

  //  If all fields are properly sent, Get Fixture from database by provided team id
  let fixture = await Fixture.findById(req.params.id);
  //  Return error if team doesnt exist in database
  if (!fixture) {
    res.status(400).json({ error: 'team does not exist' });
    return;
  }
  //  If team exists, update team
  fixture.homeTeam = req.body.homeTeam || fixture.homeTeam;
  fixture.awayTeam = req.body.awayTeam || fixture.awayTeam;
  fixture.homeScore = req.body.homeScore || fixture.homeScore;
  fixture.awayScore = req.body.awayScore || fixture.awayScore;
  fixture.stadium = req.body.stadium || fixture.stadium;
  fixture.isPending = req.body.isPending || fixture.isPending;
  fixture.referee = req.body.referee || fixture.referee;
  fixture.date = req.body.date || fixture.date;

  //  Save Fixture and send updated data, catch any possible errors
  const editedFixture = await fixture.save().catch(err => {
    res
      .status(500)
      .send(err)
      .end();
  });
  res.status(200).json(editedFixture);
}
export { createFixture, viewFixtures, editFixture };
