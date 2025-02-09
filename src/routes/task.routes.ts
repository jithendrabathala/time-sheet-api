import { Router } from 'express';
import { createTask } from '../controllers/task.controller';
import { verifyAdmin } from '../middlewares/auth';

const router: Router = Router();

router.post('/create', verifyAdmin, createTask);

export default router;
