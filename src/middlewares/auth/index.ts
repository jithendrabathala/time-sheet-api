import { Request, Response, NextFunction, RequestHandler } from 'express';
import asyncHandler from '../../utils/async-handler';
import { UnauthorizedException } from '../../exceptions';
import { verifyAccessToken } from '../../utils/jwt';
import { IJwtPlayload } from '../../types/jwt';
import { CustomRequest } from '../../types';

export { verifyAdmin } from './admin';

export const verifyToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string | null = req.headers.authorization?.split(' ')[1] || null;

    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }

    const jwtPayload: IJwtPlayload | null = await verifyAccessToken(token);

    if (!jwtPayload) {
      throw new UnauthorizedException('Invalid Token');
    }

    (req as CustomRequest).user = jwtPayload;

    next();
  },
);
