import { Request } from 'express';

export interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

export { IUser, TLoginCredentials, TUserSignUp, TLoginReponse } from './user';
export { ITask, TCreateTaskResponse, TTaskInput } from './task';
