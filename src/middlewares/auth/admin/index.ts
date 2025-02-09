import { Request, Response, NextFunction, RequestHandler } from 'express';
import { CustomRequest, IUser } from '../../../types';
import UserModel from '../../../models/User.model';
import { UnauthorizedException } from '../../../exceptions';
import asyncHandler from '../../../utils/async-handler';

export const verifyAdmin: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = (req as CustomRequest).user.id;

    const user: IUser | null = await UserModel.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!user.isAdmin) {
      throw new UnauthorizedException('You are not an admin');
    }

    next();
  },
);
