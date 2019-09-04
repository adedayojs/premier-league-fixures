import { Router } from 'express';
import { createFixture, viewFixtures, editFixture, deleteFixture } from './controller';
const router = Router();

router.post('/', createFixture);
router.get('/', viewFixtures);
router.put('/:id', editFixture);
router.delete('/:id', deleteFixture);

export default router;
