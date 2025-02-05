import {
  BadRequestException,
  EntryAlreadyExistsException,
  NotFoundException,
  UnauthorizedException,
} from '../../exceptions';
import UserModel from '../../models/User.model';
import { IUser, TLoginCredentials, TLoginReponse, TUserSignUp } from '../../types';
import { IJwtPlayload } from '../../types/jwt';
import { verifyRefreshToken } from '../../utils/jwt';

export const createUser = async ({
  email,
  username,
  password,
  profile,
}: TUserSignUp): Promise<IUser> => {
  const existingUser: IUser | null = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new EntryAlreadyExistsException('User already exists');
  }

  return await UserModel.create({ email, username, password, profile });
};

export const loginUser = async ({
  usernameOrEmail,
  password,
}: TLoginCredentials): Promise<TLoginReponse> => {
  const user: IUser | null = await UserModel.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (!(await user.comparePassword(password))) {
    throw new BadRequestException('Invalid password');
  }

  return {
    accessToken: await user.generateAccessToken(),
    refreshToken: await user.generateRefreshToken(),
    message: 'Login successful',
  } as TLoginReponse;
};

export const refreshTokenService = async (refreshToken: string | null): Promise<TLoginReponse> => {
  if (!refreshToken) {
    throw new UnauthorizedException('Invalid token');
  }

  const user: IJwtPlayload | null = await verifyRefreshToken(refreshToken);

  if (!user) {
    throw new UnauthorizedException('Invalid token');
  }

  const existingUser: IUser | null = await UserModel.findById(user.id);

  if (!existingUser) {
    throw new NotFoundException('User not found');
  }

  return {
    accessToken: await existingUser.generateAccessToken(),
    message: 'Token refreshed successfully',
  } as TLoginReponse;
};
