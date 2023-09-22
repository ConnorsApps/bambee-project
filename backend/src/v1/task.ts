import { Task } from '@prisma/client';
import { TasksPrismaClient } from '../types';

const contoller = (db: TasksPrismaClient) => {
  const create = async (task: Task) => {
    await db.task.create({ data: task });
  };

  const list = () => {
    return db.task.findMany();
  };

  const get = (id: string) => {
    return db.task.findUnique({ where: { id } });
  };

  const remove = async (id: string) => {
    await db.task.delete({ where: { id } });
  };

  return { create, list, get, remove };
};

export const tasks = { contoller };
