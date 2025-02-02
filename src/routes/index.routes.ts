import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to timesheet api' });
});

export default router;
