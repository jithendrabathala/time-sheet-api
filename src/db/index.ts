import * as mongoose from 'mongoose';
import { MONGO_DB_NAME, MONGO_URI } from '../config/env';
import logger from '../logger/winston';

// function to connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance: typeof mongoose = await mongoose.connect(`${MONGO_URI}/${MONGO_DB_NAME}`);

    logger.info({
      message: `\nConnected to MongoDB: ${connectionInstance.connection.host}\n`,
      type: 'db',
    });
  } catch (error: Error | unknown) {
    logger.error({
      message: `Error connecting to MongoDB: ${error}`,
      type: 'db',
    });
  }
};

export default connectDB;
