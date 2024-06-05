import { Router } from 'express';
import { createTask, getAllTasks, deleteTask } from '../controllers/taskController';

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.delete('/tasks/:id', deleteTask);

export default router;
