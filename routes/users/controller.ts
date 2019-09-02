import express from 'express';
import User, { IUser } from '../../models/user';
async function createUser(req: express.Request, res: express.Response) {
  // Remember to add Joi Validation when internet comes up

  const user = await new User(req.body).save().catch(err => {
    res.status(400).json(err.message);
    return;
  });
  //   console.log(user);
  res.status(201).json(user);
}
export { createUser };
