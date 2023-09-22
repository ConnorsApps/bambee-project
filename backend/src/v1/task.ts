// createTask
// updateTask
// deleteTask
// listTasks

import { Task } from '@prisma/client';
import { TasksPrismaClient } from '../types';

const contoller = (db: TasksPrismaClient) => {
  const create = async (task: Task) => {
    await db.task.create({ data: task });
  };

  return { create };
};

export const tasks = { contoller };
