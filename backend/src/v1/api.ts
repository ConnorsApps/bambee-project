import express from 'express';
import { TasksPrismaClient } from '../types';
import { sharedV1Tasks } from '../../shared/v1/tasks';

const getRouter = (db: TasksPrismaClient) => {
  const router = express.Router();

  router.post('/task', async (req, res) => {
    const issues = sharedV1Tasks.valid(req.body);
    if (issues.length > 0) return res.status(400).json({ issues });

    await db.task.create({ data: req.body });

    return res.sendStatus(200);
  });

  router.put('/task', async (req, res) => {
    const id = req.body.id;
    delete req.body.id;

    await db.task.update({ where: { id }, data: req.body });

    return res.sendStatus(200);
  });

  // Todo error handling around database queries
  // proper reponse codes like 404 & 500
  // This would be useful for debugging

  router.get('/task/list', async (_, res) => {
    const tasks = await db.task.findMany();

    return res.json(tasks);
  });

  router.delete('/task', async (req, res) => {
    const id = req.body.id;
    if (!id) return res.status(400).send({ error: 'Task ID required' });

    await db.task.delete({ where: { id } });

    return res.sendStatus(200);
  });

  return router;
};

export const apiv1 = { getRouter };
