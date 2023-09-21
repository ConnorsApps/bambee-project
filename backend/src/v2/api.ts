import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import express from 'express';

const getRouter = (
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => {
  const router = express.Router();

  router.get('/', () => {});
  console.log(db);

  return router;
};

export const apiv1 = { getRouter };
