import express from 'express';
import jwt from 'jsonwebtoken';

function validateAdminRoutes(req: express.Request, res: express.Response, next: express.NextFunction) {
  let token = `${req.headers.authorization}`;
  const bearer = token.indexOf('Bearer');
  if (bearer < 0) {
    res.sendStatus(401).end();
  }
  token = token.substring(bearer + 7);
  const secretKey = `${process.env.JWT_LOGIN_TOKEN}`;
  try {
    const payload: any = jwt.verify(token, secretKey);
    if (payload.role == 'ADMIN') {
      next();
      return;
    }
    res.sendStatus(403);
  } catch (error) {
    res.sendStatus(403);
  }
}

function validateUserRoutes(req: express.Request, res: express.Response, next: express.NextFunction) {
  let token = `${req.headers.authorization}`;
  const bearer = token.indexOf('Bearer');
  if (bearer < 0) {
    res.sendStatus(401).end();
  }
  token = token.substring(bearer + 7);
  const secretKey = `${process.env.JWT_LOGIN_TOKEN}`;
  try {
    const payload: any = jwt.verify(token, secretKey);
    if (payload.role == 'ADMIN' || payload.role == 'USER') {
      next();
      return;
    }
    res.sendStatus(401);
  } catch (error) {
    res.sendStatus(401);
  }
}

export { validateAdminRoutes, validateUserRoutes };
