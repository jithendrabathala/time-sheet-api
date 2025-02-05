import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({}, { timestamps: true });

export default model('tasks', TaskSchema);
