import express from 'express';
import { TasksPrismaClient } from '../types';
import { tasks } from './task';
import { sharedV1Tasks } from '../../shared/v1/tasks';

const getRouter = (db: TasksPrismaClient) => {
  const router = express.Router();
  const tasksController = tasks.contoller(db);

  router.post('/task', async (req, res) => {
    const issues = sharedV1Tasks.valid(req.body);
    if (issues.length > 0) return res.status(400).json({ issues });

    await tasksController.create(req.body);

    res.status(200);
    return res.send({ message: 'created' });
  });

  return router;
};

export const apiv1 = { getRouter };
