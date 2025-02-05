import { Router, Request, Response } from 'express';
import asyncHandler from '../utils/async-handler';
import authRouter from './auth.routes';
import taskRouter from './task.routes';

const router: Router = Router();

router.get(
  '/',
  asyncHandler((_req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to timesheet api' });
  }),
);

router.use('/auth', authRouter);
router.use('/task', taskRouter);

export default router;
