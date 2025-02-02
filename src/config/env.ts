import dotenv from 'dotenv';
import { UnitAnyCase } from '../types/jwt';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

export const NODE_ENV = (process.env.NODE_ENV ?? 'local') as string;

export const PORT = (process.env.PORT ?? '8000') as string;

export const MONGO_URI = (process.env.MONGO_URI ?? 'mongodb://localhost:27017') as string;
export const MONGO_DB_NAME = (process.env.MONGO_DB_NAME ?? 'time-sheet') as string;

export const ACCESS_TOKEN_SECRET = (process.env.ACCESS_TOKEN_SECRET ?? 'secret') as string;
export const ACCESS_TOKEN_EXPIRY_UNIT = (process.env.ACCESS_TOKEN_EXPIRY_UNIT ??
  'h') as UnitAnyCase;
export const ACCESS_TOKEN_EXPIRY_VALUE = parseInt(
  process.env.ACCESS_TOKEN_EXPIRY_VALUE ?? '1',
) as number;

export const REFRESH_TOKEN_SECRET = (process.env.REFRESH_TOKEN_SECRET ?? 'secret') as string;
export const REFRESH_TOKEN_EXPIRY_UNIT = (process.env.REFRESH_TOKEN_EXPIRY_UNIT ??
  'h') as UnitAnyCase;
export const REFRESH_TOKEN_EXPIRY_VALUE = parseInt(
  process.env.REFRESH_TOKEN_EXPIRY_VALUE ?? '1',
) as number;
