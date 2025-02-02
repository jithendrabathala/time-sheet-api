import { Request, RequestHandler, Response } from 'express';
import asyncHandler from '../utils/async-handler';
import { createUser, loginUser } from '../services/auth';
import { TLoginCredentials, TLoginReponse } from '../types';
import { NODE_ENV } from '../config/env';

// register controller
// FIXME: validate user input
export const register: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password, profile } = req.body;

  await createUser({ email, username, password, profile });

  res.status(201).json({
    message: 'User created successfully',
    success: true,
  });
});

// login controller
// FIXME: validate login credentials
export const login: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  const { usernameOrEmail, password }: TLoginCredentials = req.body;

  const loginResponse: TLoginReponse = await loginUser({ usernameOrEmail, password });

  res.cookie('refreshToken', loginResponse.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'strict',
    secure: NODE_ENV === 'production',
  });

  res.status(200).json({ token: loginResponse.accessToken, message: loginResponse.message });
});

// refresh token controller
// TODO: implement refresh token logic
export const refreshToken: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Token refreshed successfully' });
});

// logout controller
export const logout: RequestHandler = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logout successfully' });
});
