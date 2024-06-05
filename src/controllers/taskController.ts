import { Request, Response } from 'express';
import Task from '../models/task';
import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import { io } from '../index';
import { taskSchema } from '../validators/taskValidator';

// Schedule task function
const scheduleTask = (task: any) => {
  const date = new Date(task.date);
  const cronExpression = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;

  console.log(`Scheduling task: ${task.title} at ${cronExpression}`);

  cron.schedule(cronExpression, async () => {
    const filePath = path.join(__dirname, `../../../${task.title.replace(/\s+/g, '_')}.txt`);
    const content = `Title: ${task.title}\nDescription: ${task.description}\nTime: ${new Date(task.date).toLocaleString()}\nStatus: complete}`;
    fs.writeFileSync(filePath, content);
    console.log(`File created for task: ${task.title}`);
    task.status = 'complete';
    await task.save();
    io.emit('taskUpdated', task);
  });
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, description, date } = req.body;
    const task = new Task({ title, description, date });
    await task.save();
    scheduleTask(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
