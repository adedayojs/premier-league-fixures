import express from 'express';
import userRouteHandler from './users/router';
import teamRouteHandler from './teams/router';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'all is well' });
});

router.use('/users', userRouteHandler);
router.use('/teams', teamRouteHandler);
export default router;
