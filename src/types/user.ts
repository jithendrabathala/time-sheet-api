import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  profile?: string;
  comparePassword(password: string): () => Promise<boolean>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}

export type TUserSignUp = {
  email: string;
  username: string;
  password: string;
  profile?: string;
};

export type TLoginCredentials = {
  usernameOrEmail: string;
  password: string;
};

export type TLoginReponse = {
  accessToken: string;
  refreshToken?: string;
  message: string;
};
