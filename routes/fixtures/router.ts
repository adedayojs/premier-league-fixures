import { Router } from 'express';
import { createFixture, viewFixtures } from './controller';
const router = Router();

router.post('/', createFixture);
router.get('/', viewFixtures);

export default router;
