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
  const saltRounds = parseInt(`${process.env.SALT_ROUNDS}`);
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
  /*  Check incoming data if it matches required data and return error
      if it doesn't match required data
      */
  const { error } = validateLogin(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  /* Check if user exist in database, return not found (404) if user does not exists*/
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({ error: 'User Does Not Exist in Our Database' });
    return;
  }

  /* If User Exists compare the password with the existing one in the database*/
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    res.status(400).json({ error: 'Wrong Password Supplied' });
    return;
  }

  /* If password matches, create a token for the said user and send it back*/
  const secretKey = `${process.env.JWT_LOGIN_TOKEN}`;
  const payload = req.body;
  const token = jwt.sign(payload, secretKey);
  res.json({ token });
}
export { createUser, logUserIn };
