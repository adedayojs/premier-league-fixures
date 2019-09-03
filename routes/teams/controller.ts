import express from 'express';
import Team from '../../models/team';
import {validateTeam} from '../../helpers/joi-validator'

async function createTeam(req: express.Request, res: express.Response) {
  // Remember to add Joi Validation when internet comes up
  const {error} = validateTeam(req.body)
  if(error) {
    res.status(400).json(error)
    return
  }
  const team = await new Team(req.body).save().catch(err => {
    res.status(400).json(err.message);
    return;
  });
  res.status(201).json(team);
  res.end();
}
function viewTeam(req: express.Request, res: express.Response) {
  res.end();
}
function editTeam(req: express.Request, res: express.Response) {
  res.end();
}
function deleteTeam(req: express.Request, res: express.Response) {
  res.end();
}
export { createTeam, viewTeam, editTeam, deleteTeam };
