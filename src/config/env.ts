import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

export const NODE_ENV = (process.env.NODE_ENV ?? 'local') as string;

export const PORT = (process.env.PORT ?? '8080') as string;
