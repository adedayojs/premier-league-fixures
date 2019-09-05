import express from 'express';
import userRouteHandler from './users/router';
import teamRouteHandler from './teams/router';
import fixtureRouteHandler from './fixtures/router';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'all is well' });
});

router.use('/users', userRouteHandler);
router.use('/teams', teamRouteHandler);
router.use('/fixtures', fixtureRouteHandler);
export default router;
