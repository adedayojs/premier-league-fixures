import { Router } from 'express';
import { createTeam, deleteTeam, editTeam, viewTeam } from './controller';
import { validateAdminRoutes } from '../../middlewares/routesTokenValidator';
const router = Router();

router.post('/', validateAdminRoutes, createTeam);
router.get('/', viewTeam);
router.put('/:id', validateAdminRoutes, editTeam);
router.delete('/:id', validateAdminRoutes, deleteTeam);

export default router;
