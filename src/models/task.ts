import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  date: Date;
  status: 'not_started' | 'complete';
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['not_started', 'complete'], default: 'not_started' }
});

const Task = model<ITask>('Task', TaskSchema);

export default Task;
