import { Router } from 'express';
import { createTeam, deleteTeam, editTeam, viewTeam } from './controller';
const router = Router();

router.post('/', createTeam);

export default router;
