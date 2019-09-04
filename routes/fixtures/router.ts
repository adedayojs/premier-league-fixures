import { Router } from 'express';
import { createFixture, viewFixtures, editFixture } from './controller';
const router = Router();

router.post('/', createFixture);
router.get('/', viewFixtures);
router.put('/:id', editFixture);

export default router;
