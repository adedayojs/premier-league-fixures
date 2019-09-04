import express from 'express';
import User, { IUser } from '../../models/user';
import { validateUser, validateLogin } from '../../helpers/joi-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
async function createUser(req: express.Request, res: express.Response) {
  /*  Check incoming data if it matches required data and return error
      if it doesn't match required data
      */
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }

  /* Hash Password before storing into database*/
  const saltRounds = 16;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;

  /*Store Data Into database*/
  const user = await new User(req.body).save().catch(err => {
    res.status(400).json(err.message);
    return;
  });
  //   console.log(user);
  res.status(201).json(user);
}

async function logUserIn(req: express.Request, res: express.Response) {
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
}
export { createUser, logUserIn };
