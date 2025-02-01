import express, { Express } from 'express';
import { createServer, Server } from 'http';

const app: Express = express();

const httpServer: Server = createServer(app);

export default httpServer;
