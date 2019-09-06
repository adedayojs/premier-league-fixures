import express from 'express';
import Team, { ITeam } from '../../models/team';
import { validateTeam } from '../../helpers/joi-validator';
import { client } from '../../app';

/* Team Creator*/
async function createTeam(req: express.Request, res: express.Response) {
  // Remember to add Joi Validation when internet comes up
  const { error } = validateTeam(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  const team: any = await new Team(req.body).save().catch(err => {
    res.status(400).json(err.message);
    return;
  });
  //  After Creating a new team remove the list of all team on the redis server
  client.flushall();

  res.status(201).json(team);
  res.end();
  client.setex(team._id.toString(), 3600, JSON.stringify(team));
}

function viewTeam(req: express.Request, res: express.Response) {
  //  Check Redis Store first for presence of data
  return client.get('allTeams', async (err: any, teams: any) => {
    // If that key exists in Redis store
    if (teams) {
      return res.json({ source: 'cache', data: JSON.parse(teams) });
    } else {
      //  If key doesnt exist in Redis Store
      const teams = await Team.find({}).catch(err => {
        res.status(500).json(err);
      });
      client.setex('allTeams', 3600, JSON.stringify(teams));
      res.json({ source: 'api', data: teams });

      return;
    }
  });
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

  //  Save Team to database
  const editedTeam = await team.save();

  //  After Creating a new team flush the redis server
  client.flushall();

  //  Save Team data to Redis Store
  client.setex(editedTeam._id.toString(), 3600, JSON.stringify(editedTeam));

  //  Send Data to frontend
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
  //  Flush the redis server
  client.flushall();

  res.status(200).json(deleted);
}
export { createTeam, viewTeam, editTeam, deleteTeam };
