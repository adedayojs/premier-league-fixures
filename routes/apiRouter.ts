import express from 'express';
import userRouteHandler from './users/router';
import teamRouteHandler from './teams/router';
import fixtureRouteHandler from './fixtures/router';
const router = express.Router();
import limiter from '../middlewares/rateLimiter'
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'all is well' });
});

router.use('/users', limiter, userRouteHandler);
router.use('/teams', limiter, teamRouteHandler);
router.use('/fixtures', limiter, fixtureRouteHandler);
export default router;
