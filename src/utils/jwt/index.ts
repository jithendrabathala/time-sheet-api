import * as jwt from 'jsonwebtoken';

import { IJwtPlayload, StringValue, UnitAnyCase } from '../../types/jwt';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY_VALUE,
  ACCESS_TOKEN_EXPIRY_UNIT,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY_VALUE,
  REFRESH_TOKEN_EXPIRY_UNIT,
} from '../../config/env';
import { UnauthorizedException } from '../../exceptions';
import logger from '../../logger/winston';

const generateToken = async (
  jwtPayload: IJwtPlayload,
  sceret: string,
  expiresInOptions: { value: number; unit: UnitAnyCase },
): Promise<string> => {
  const { value, unit } = expiresInOptions;

  const expiresIn: StringValue = `${value}${unit}`;

  return await jwt.sign({ id: jwtPayload.id } as IJwtPlayload, sceret, {
    expiresIn,
  } as jwt.SignOptions);
};

const verifyToken = (token: string, secret: string): IJwtPlayload | null => {
  try {
    return jwt.verify(token, secret) as IJwtPlayload | null;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token');
    }
    throw error;
  }
};

export const generateAccessToken = async (jwtPayload: IJwtPlayload): Promise<string> => {
  // printing the current time in hr:min:sec format
  logger.debug('access token created at ' + new Date().toLocaleTimeString());
  return await generateToken(jwtPayload, ACCESS_TOKEN_SECRET, {
    value: ACCESS_TOKEN_EXPIRY_VALUE,
    unit: ACCESS_TOKEN_EXPIRY_UNIT,
  });
};

export const generateRefreshToken = async (jwtPayload: IJwtPlayload): Promise<string> => {
  logger.debug('refresh token created at ' + new Date().toLocaleTimeString());
  return await generateToken(jwtPayload, REFRESH_TOKEN_SECRET, {
    value: REFRESH_TOKEN_EXPIRY_VALUE,
    unit: REFRESH_TOKEN_EXPIRY_UNIT,
  });
};

export const verifyAccessToken = (token: string): IJwtPlayload | null => {
  return verifyToken(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string): IJwtPlayload | null => {
  return verifyToken(token, REFRESH_TOKEN_SECRET);
};
