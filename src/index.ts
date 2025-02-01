import httpServer from './app';

import { PORT } from './config/env';

const startServer = (): void => {
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

const startApp = async (): Promise<void> => {
  try {
    await startServer();
  } catch (error) {
    console.error('Error starting server: ', error);
  }
};

startApp();
