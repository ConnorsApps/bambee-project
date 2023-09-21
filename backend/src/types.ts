import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export type TasksPrismaClient = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  DefaultArgs
>;
