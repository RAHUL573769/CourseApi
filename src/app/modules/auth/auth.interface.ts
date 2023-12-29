import { Types } from 'mongoose';
import { TUserRole } from '../user/user.interface';

export type TLogin = {
  username: string;
  password: string;
};

export type TJwtPayload = {
  _id: Types.ObjectId;
  role: TUserRole;
  email: string;
};

export type TChangePassword = {
  currentPassword: string;
  newPassword: string;
};
