import { CustomRequest, ITask, TTaskInput } from './../types';
import { RequestHandler, Response, Request } from 'express';
import asyncHandler from '../utils/async-handler';
import { createTaskService } from '../services/tasks';

export const createTask: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    status,
    priority,
    startingAt,
    endingAt,
    dueDate,
    assignee,
  }: TTaskInput = (req as CustomRequest).body;

  const newTask: ITask = await createTaskService({
    title,
    description,
    status,
    priority,
    startingAt,
    endingAt,
    dueDate,
    assignee,
    createdBy: (req as CustomRequest).user.id,
  });

  res.status(201).json({ task: newTask, message: 'Task created successful' });
});
