import { Router } from 'express';
import { createUser, logUserIn } from './controller';

const router = Router();

router.post('/', createUser);
router.post('/login', logUserIn);

export default router;
