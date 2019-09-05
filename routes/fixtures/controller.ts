import express from 'express';
import Fixture from '../../models/fixture';
import { validateFixture } from '../../helpers/joi-validator';
import validateTeamInDatabase from '../../helpers/team-in-database-validator';

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
  const isInDatabase = await validateTeamInDatabase([req.body.homeFixture, req.body.awayFixture]);
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

  //  If all fields are properly sent, Get Fixture from database by provided fixture id
  let fixture = await Fixture.findById(req.params.id);
  //  Return error if fixture doesnt exist in database
  if (!fixture) {
    res.status(400).json({ error: 'fixture does not exist' });
    return;
  }
  //  If fixture exists, update fixture
  fixture.homeTeam = req.body.homeTeam;
  fixture.awayTeam = req.body.awayTeam;
  fixture.homeScore = req.body.homeScore;
  fixture.awayScore = req.body.awayScore;
  fixture.stadium = req.body.stadium;
  fixture.isPending = req.body.isPending;
  fixture.referee = req.body.referee;
  fixture.date = req.body.date;

  //  Save Fixture and send updated data, catch any possible errors
  const editedFixture = await fixture.save().catch(err => {
    res
      .status(500)
      .send(err)
      .end();
  });
  res.status(200).json(editedFixture);
}

async function deleteFixture(req: express.Request, res: express.Response) {
  const deleted = await Fixture.findByIdAndDelete(req.params.id).catch(err => {
    res.status(500).end();
    return err;
  });
  if (!deleted) {
    res.status(404).json({ error: 'Fixture Does Not Exist' });
    return;
  }
  res.status(200).json(deleted);
}
export { createFixture, viewFixtures, editFixture, deleteFixture };
