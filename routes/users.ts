import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(_req, res) {
  res.redirect('../')
});

export default router;
