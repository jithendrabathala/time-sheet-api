import httpServer from './app';

import { PORT } from './config/env';
import logger from './logger/winston';

// function to start the http server
const startServer = (): void => {
  httpServer.listen(PORT, () => {
    logger.info({
      message: `Server listening on port ${PORT}`,
      type: 'server',
    });
  });
};

// function to start the app
const startApp = async (): Promise<void> => {
  try {
    await startServer();
  } catch (error: unknown) {
    logger.error({
      message: `Error starting server: ${error}`,
      type: 'server',
    });
  }
};

// main function to start the app
startApp();
