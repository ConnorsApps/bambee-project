import { Request, Response } from 'express';
import { TasksPrismaClient } from '../types';
import { sharedTaskUtils } from '../utils';

const getHandlers = (db: TasksPrismaClient) => {
  const createTaskHandler = async (req: Request, res: Response) => {
    const issues = sharedTaskUtils.valid(req.body);
    if (issues.length > 0) return res.status(400).json({ issues });

    await db.task.create({ data: req.body });

    return res.sendStatus(200);
  };

  const updateTaskHandler = async (req: Request, res: Response) => {
    const id = req.body.id;
    delete req.body.id;

    await db.task.update({ where: { id }, data: req.body });

    return res.sendStatus(200);
  };

  // Todo error handling around database queries
  // proper reponse codes like 404 & 500
  // This would be useful for debugging

  const listTaskHandler = async (_, res: Response) => {
    const tasks = await db.task.findMany();

    return res.json(tasks);
  };

  const removeTaskHandler = async (req: Request, res: Response) => {
    const id = req.body.id;
    if (!id) return res.status(400).send({ error: 'Task ID required' });

    await db.task.delete({ where: { id } });

    return res.sendStatus(200);
  };

  return {
    createTaskHandler,
    updateTaskHandler,
    listTaskHandler,
    removeTaskHandler,
  };
};

export const apiv2 = { getHandlers };
