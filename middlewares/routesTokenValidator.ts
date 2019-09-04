import express from 'express';
import jwt from 'jsonwebtoken';

function validateAdminRoutes(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = `${req.headers.authorization}`;
  const secretKey = `${process.env.JWT_LOGIN_TOKEN}`;
  try {
    const payload: any = jwt.verify(token, secretKey);
    if (payload.role == 'ADMIN') {
      next();
      return;
    }
    res.status(403);
  } catch (error) {
    res.status(403);
  }
}

function validateUserRoutes(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = `${req.headers.authorization}`;
  const secretKey = `${process.env.JWT_LOGIN_TOKEN}`;
  try {
    const payload: any = jwt.verify(token, secretKey);
    if (payload.role == 'ADMIN' || payload.role == 'USER') {
      next();
      return;
    }
    res.status(401);
  } catch (error) {
    res.status(401);
  }
}

export default { validateAdminRoutes, validateUserRoutes };
