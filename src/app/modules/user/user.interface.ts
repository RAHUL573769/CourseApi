import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constants';

export type TUserRole = keyof typeof USER_ROLE;

export type TPassword = { password: string; timestamp: Date }[];
export type TUser = {
  username: string;
  email: string;
  password: string;
  role: TUserRole;
  passwordHistory: TPassword;
};

export interface IUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: Types.ObjectId): boolean;
  isPasswordMatched(password: string, hashedPassword: string): boolean;
}
