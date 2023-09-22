import { Task } from '@prisma/client';

const valid = (task: Task) => {
  // todo
  const issues = [];
  console.log('task',task)

  return issues;
};

export const sharedV1Tasks = { valid };
