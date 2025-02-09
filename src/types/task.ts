import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  startingAt: Date;
  endingAt: Date;
  dueDate: Date;
  assignee: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TCreateTaskResponse = {
  message: string;
};

export type TTaskInput = {
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  startingAt: Date;
  endingAt: Date;
  dueDate: Date;
  assignee: string;
  createdBy: string;
};
