import cors from 'cors';
import express, { Express } from 'express';
import { createServer, Server } from 'http';

import rootRouter from './routes/index.routes';
import ErrorHandler from './middlewares/error';

const app: Express = express();

const httpServer: Server = createServer(app);

app.use(express.json());
app.use(cors({ credentials: true }));

app.use('/api', rootRouter);

app.use(ErrorHandler);

export default httpServer;
