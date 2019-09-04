import { Router } from 'express';
import { createFixture } from './controller';
const router = Router();

router.post('/', createFixture);

export default router;
