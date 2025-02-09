import { Router } from 'express';
import { createTask, getMyTasks } from '../controllers/task.controller';
import { verifyAdmin } from '../middlewares/auth';

const router: Router = Router();

router.post('/', verifyAdmin, createTask);
router.get('/my', getMyTasks);

export default router;
