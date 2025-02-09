import TaskModel from '../../models/Task.model';
import { ITask, TTaskInput } from '../../types';

export const createTaskService = async (task: TTaskInput): Promise<ITask> => {
  const newTask: ITask = await TaskModel.create(task);

  return newTask;
};
