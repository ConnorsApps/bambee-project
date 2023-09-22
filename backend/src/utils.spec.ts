import { Task, TaskStatus } from '@prisma/client';
import { sharedTaskUtils } from './utils';

describe('Test Task Validation', () => {
  it('Valid Task', () => {
    const task: Task = {
      id: 'something',
      name: 'New Task',
      description: 'Task description',
      dueBy: new Date(),
      createdAt: new Date(),
      status: TaskStatus.NEW,
    };
    const issues = sharedTaskUtils.valid(task);
    expect(issues.length).toEqual(0);
  });

  it('Task Missing name', () => {
    const task: any = {
      id: 'something',
      description: 'Task description',
      dueBy: new Date(),
      createdAt: new Date(),
      status: TaskStatus.NEW,
    };
    const issues = sharedTaskUtils.valid(task);
    expect(issues.length).toEqual(1);
  });

  it('Task Missing dueBy', () => {
    const task: any = {
      id: 'something',
      name: 'New Task',
      description: 'Task description',
      createdAt: new Date(),
      status: TaskStatus.NEW,
    };
    const issues = sharedTaskUtils.valid(task);
    expect(issues.length).toEqual(1);
  });
});
