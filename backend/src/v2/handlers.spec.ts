import { prismaMock } from '../test-utils/singleton';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { apiv2 } from './handlers';
import { Task } from '@prisma/client';

describe('Task Handlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a task', async () => {
    const req = getMockReq({
      body: {
        name: 'New Task',
        description: 'Task description',
        dueBy: new Date(),
        status: 'NEW',
      },
    });
    const { res } = getMockRes();

    const handlers = apiv2.getHandlers(prismaMock as any);

    await handlers.createTaskHandler(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it('updates a task', async () => {
    const req = getMockReq({
      body: {
        id: 'task-id',
        name: 'Updated Task',
        status: 'IN_PROGRESS',
      },
    });
    const { res } = getMockRes();

    const handlers = apiv2.getHandlers(prismaMock as any);

    await handlers.updateTaskHandler(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it('lists tasks', async () => {
    const mockTasks: [Task] = [
      {
        id: 'task-id',
        name: 'Task 1',
        createdAt: new Date(),
        description: 'Task description',
        dueBy: new Date(),
        status: 'COMPLETE',
      },
    ];
    prismaMock.task.findMany.mockResolvedValue(mockTasks);

    const req = getMockReq();
    const { res } = getMockRes();

    const handlers = apiv2.getHandlers(prismaMock as any);

    await handlers.listTaskHandler(req, res);

    expect(prismaMock.task.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });

  it('removes a task', async () => {
    const req = getMockReq({ body: { id: 'task-id' } });
    const { res } = getMockRes();

    prismaMock.task.delete.mockResolvedValue({} as any);

    const handlers = apiv2.getHandlers(prismaMock as any);

    await handlers.removeTaskHandler(req, res);

    expect(prismaMock.task.delete).toHaveBeenCalledWith({
      where: { id: 'task-id' },
    });
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

});
