export enum TaskStatus {
  NEW = 'NEW',
  COMPLETE = 'COMPLETE',
}
export enum TaskStatusV2 {
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface Task {
  id?: string;
  name: string;
  createdAt: Date;
  description?: string | null;
  dueBy: Date;
  status: TaskStatus | TaskStatusV2;
}

export interface TaskV2 extends Task {}
