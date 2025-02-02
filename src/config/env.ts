import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

export const NODE_ENV = (process.env.NODE_ENV ?? 'local') as string;

export const PORT = (process.env.PORT ?? '8080') as string;

export const MONGO_URI = (process.env.MONGO_URI ??
  'mongodb://localhost:27017') as string;
export const MONGO_DB_NAME = (process.env.MONGO_DB_NAME ??
  'time-sheet') as string;
