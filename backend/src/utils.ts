import { Task } from '@prisma/client';

const valid = (task: Task) => {
  const issues = [];
  if (!task.name) issues.push('name required');
  if (!task.dueBy) issues.push('dueBy required');
  if (!task.status) issues.push('status required');

  return issues;
};

export const sharedTaskUtils = { valid };
