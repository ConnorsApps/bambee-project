export enum TaskStatusV1 {
  NEW = 'NEW',
  COMPLETE = 'COMPLETE',
}

export interface TaskV1 {
  id?: string;
  name: string;
  createdAt: Date;
  description?: string | null;
  dueBy: Date;
  status: TaskStatusV1;
}
