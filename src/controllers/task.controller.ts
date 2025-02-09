import { CustomRequest, ITask, TTaskInput } from './../types';
import { RequestHandler, Response, Request } from 'express';
import asyncHandler from '../utils/async-handler';
import { createTaskService, getMyTasksService } from '../services/tasks';
import { NotFoundException } from '../exceptions';

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

export const getMyTasks: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  const filters = req.query;

  const tasks: ITask[] = await getMyTasksService((req as CustomRequest).user.id, filters);

  if (!tasks.length) {
    throw new NotFoundException('No tasks found');
  }

  res.status(200).json({ tasks, length: tasks.length });
});
