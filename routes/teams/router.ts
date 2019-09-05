import { Router } from 'express';
import { createTeam, deleteTeam, editTeam, viewTeam } from './controller';
const router = Router();

router.post('/', createTeam);
router.get('/', viewTeam);
router.put('/:id', editTeam);
router.delete('/:id', deleteTeam);

export default router;
