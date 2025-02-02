import {
  BadRequestException,
  EntryAlreadyExistsException,
  NotFoundException,
} from '../../exceptions';
import UserModel from '../../models/User.model';
import { IUser, TLoginCredentials, TLoginReponse, TUserSignUp } from '../../types';

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
