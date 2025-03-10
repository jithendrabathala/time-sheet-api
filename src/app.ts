import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { createServer, Server } from 'http';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import rootRouter from './routes/index.routes';
import ErrorHandler from './middlewares/error';

const file = fs.readFileSync(path.resolve('./swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);

const app: Express = express();

const httpServer: Server = createServer(app);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    // preflightContinue: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    origin: 'http://localhost:3000',
  }),
);
app.use(cookieParser());

app.use('/api', rootRouter);

app.use(ErrorHandler);

app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
    },
    customSiteTitle: 'Time Sheet API docs',
  }),
);

export default httpServer;
