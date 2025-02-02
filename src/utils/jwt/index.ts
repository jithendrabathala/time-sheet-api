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

export const generateAccessToken = async (jwtPayload: IJwtPlayload): Promise<string> => {
  return await generateToken(jwtPayload, ACCESS_TOKEN_SECRET, {
    value: ACCESS_TOKEN_EXPIRY_VALUE,
    unit: ACCESS_TOKEN_EXPIRY_UNIT,
  });
};

export const generateRefreshToken = async (jwtPayload: IJwtPlayload): Promise<string> => {
  return await generateToken(jwtPayload, REFRESH_TOKEN_SECRET, {
    value: REFRESH_TOKEN_EXPIRY_VALUE,
    unit: REFRESH_TOKEN_EXPIRY_UNIT,
  });
};

export const generateToken = async (
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
