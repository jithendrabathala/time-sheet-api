import { RequestHandler, Request, Response } from 'express';
import asyncHandler from '../utils/async-handler';

export const createTask: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  void req;
  void res;
});
