import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TChangePassword, TJwtPayload, TLogin } from './auth.interface';
import { createToken } from '../../utils/createToken';
import { BCRYPT_SALT_ROUND, JWT_ACCESS_EXPIRE, JWT_ACCESS_TOKEN_SECRET } from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// create user
const registerUser = async (payload: TUser): Promise<TUser | null> => {
  const user = await User.create(payload);
  return user;
};

//login user
const login = async (payload: TLogin) => {
  const user = await User.findOne({ username: payload.username }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  // check if user password not match
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.CONFLICT, 'Passwords do not match');
  }

  const jwtPayload: TJwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };
  console.log(JWT_ACCESS_EXPIRE);

  const accessToken = createToken(jwtPayload, JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_EXPIRE as string);
  return {
    user: { ...jwtPayload, username: user.username },
    token: accessToken,
  };
};

const changePassword = async (userData: JwtPayload, payload: TChangePassword) => {
  const { currentPassword, newPassword } = payload;

  const user = await User.findById(userData._id).select('+password +passwordHistory');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
  }
  const { password } = user;
  if (!(await User.isPasswordMatched(currentPassword, user.password))) {
    throw new AppError(httpStatus.CONFLICT, 'Passwords do not match');
  }

  if (await User.isPasswordMatched(newPassword, password)) {
    throw new AppError(httpStatus.CONFLICT, 'Try another password');
  }

  // Check if the new password matches any of the previous passwords
  for (const obj of user.passwordHistory) {
    if (await User.isPasswordMatched(newPassword, obj.password)) {
      throw new AppError(
        400,
        `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${obj.timestamp
          .toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })
          .replace(/\//g, '-')}).`,
      );
    }
  }

  const hashedPassword = await bcrypt.hash(newPassword, Number(BCRYPT_SALT_ROUND));

  user.passwordHistory.unshift({ password: hashedPassword, timestamp: new Date() });
  user.passwordHistory = user.passwordHistory.slice(0, 2);
  // passwordHistory.pop();

  const updatedUser = await User.findByIdAndUpdate(
    userData._id,
    {
      password: hashedPassword,
      passwordHistory: user.passwordHistory,
    },
    { new: true },
  );

  return updatedUser;
};

export const AuthServices = {
  registerUser,
  login,
  changePassword,
};
