import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiv1 } from './v1/api';
import { apiv2 } from './v2/api';

dotenv.config();

const db = new PrismaClient();
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);

app.use(express.json());

const v1Handlers = apiv1.getHandlers(db);
const v1Router = express.Router();

const v2Handlers = apiv2.getHandlers(db);
const v2Router = express.Router();

// API /v1
v1Router.post('/task', v1Handlers.createTaskHandler);
v1Router.get('/task/list', v1Handlers.listTaskHandler);
v1Router.delete('/task', v1Handlers.removeTaskHandler);
v1Router.put('/task', v1Handlers.updateTaskHandler);

// API /v2
v2Router.post('/task', v2Handlers.createTaskHandler);
v2Router.get('/task/list', v2Handlers.listTaskHandler);
v2Router.delete('/task', v2Handlers.removeTaskHandler);
v2Router.put('/task', v2Handlers.updateTaskHandler);

app.use('/v1', v1Router);
app.use('/v2', v2Router);

const main = async () => {
  await db.$connect();

  app.listen(5152, () => console.log('Server running on port 5152'));
};

main();
