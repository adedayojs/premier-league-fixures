import express from 'express';
import Team from '../../models/team';
import { validateTeam } from '../../helpers/joi-validator';

/* Team Creator*/
async function createTeam(req: express.Request, res: express.Response) {
  // Remember to add Joi Validation when internet comes up
  const { error } = validateTeam(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  const team = await new Team(req.body).save().catch(err => {
    res.status(400).json(err.message);
    return;
  });
  res.status(201).json(team);
  res.end();
}

/* Team Viewer*/
async function viewTeam(req: express.Request, res: express.Response) {
  //  Get requested team from database, hande any possible error
  const teams = await Team.find({}).catch(err => {
    res.status(500).json(err);
  });
  res.json(teams);

  return;
}

/* Team Editor*/
async function editTeam(req: express.Request, res: express.Response) {
  //  Validate to make sure that the required parameters are supplied
  const { error } = validateTeam(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }

  //  If all fields are properly sent, Get Team from database by provided team id
  let team = await Team.findById(req.params.id).catch(err => {
    res.status(500).json(err);
    return err;
  });
  //  Return error if team doesnt exist in database
  if (!team) {
    res.status(400).json({ error: 'team does not exist' });
    return;
  }
  //  If team exists, update team
  team.name = req.body.name || team.name;
  team.manager = req.body.manager || team.manager;
  team.league = req.body.league || team.league;
  team.fixtures = req.body.fixtures || team.fixtures;
  team.owner = req.body.owner || team.owner;
  team.established = req.body.established || team.established;
  team.formation = req.body.formation || team.formation;

  //  Save Team and send updated data
  const editedTeam = await team.save();
  res.status(200).json(editedTeam);
}

async function deleteTeam(req: express.Request, res: express.Response) {
  const deleted = await Team.findByIdAndDelete(req.params.id).catch(err => {
    res.status(500).json(err);
    return err;
  });
  if (!deleted) {
    res.status(404).json({ error: 'Team Does Not Exist' });
    return;
  }
  res.status(200).json(deleted);
}
export { createTeam, viewTeam, editTeam, deleteTeam };
