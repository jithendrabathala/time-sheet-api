import { Schema, model } from 'mongoose';

import { IUser } from '../types';
import { hashPassword, comparePassword } from '../utils/auth';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default:
        'https://res.cloudinary.com/dx3oz5wop/image/upload/v1628585589/default-profile-image.jpg',
    },
  },
  { timestamps: true },
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await hashPassword(this.password);
  next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await comparePassword(password, this.password);
};

UserSchema.methods.generateAccessToken = async function (): Promise<string> {
  return await generateAccessToken({ id: this._id });
};

UserSchema.methods.generateRefreshToken = async function (): Promise<string> {
  return await generateRefreshToken({ id: this._id });
};

export default model('users', UserSchema);
