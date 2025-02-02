import cors from 'cors';
import express, { Express } from 'express';
import { createServer, Server } from 'http';

import rootRouter from './routes/index.routes';

const app: Express = express();

const httpServer: Server = createServer(app);

app.use(express.json());
app.use(cors({ credentials: true }));

app.use('/api', rootRouter);

export default httpServer;
