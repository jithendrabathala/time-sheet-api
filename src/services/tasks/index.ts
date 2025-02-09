import TaskModel from '../../models/Task.model';
import { ITask, TTaskInput } from '../../types';

export const createTaskService = async (task: TTaskInput): Promise<ITask> => {
  const newTask: ITask = await TaskModel.create(task);

  return newTask;
};

export const getMyTasksService = async (
  userId: string,
  filters: Record<string, unknown>,
): Promise<ITask[]> => {
  const tasks: ITask[] = await TaskModel.find({ assignee: userId, ...filters });

  return tasks;
};
