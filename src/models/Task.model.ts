import { Schema, model } from 'mongoose';
import { ITask } from '../types';

const TaskSchema: Schema<ITask> = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'on-hold'],
      default: 'pending',
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
      required: true,
    },
    startingAt: { type: Date, required: true },
    endingAt: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true },
);

export default model('tasks', TaskSchema);
