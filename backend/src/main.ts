import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiv1 } from './v1/api';

dotenv.config();

const prismaClient = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);

app.use(express.json());

app.use('/v1', apiv1.getRouter(prismaClient));
app.use('/v2', apiv1.getRouter(prismaClient));

const main = async () => {
  await prismaClient.$connect();

  app.listen(5152, () => console.log('Server running on port 5152'));
};

main();
