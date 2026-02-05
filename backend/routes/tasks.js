import express from "express";
import {getTask, createTask ,updateTask,deleteTask,updateTaskStatus } from '../controllers/taskcontroller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/tasks', auth, getTask);
router.post('/tasks', auth, createTask);
router.put('/tasks/:id', auth, updateTask);
router.patch('/tasks/:id/status', auth, updateTaskStatus);
router.delete('/tasks/:id', auth, deleteTask);

export default router;