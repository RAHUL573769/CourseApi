import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { verifyToken } from '../utils/createToken';
import { JWT_ACCESS_TOKEN_SECRET } from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
// import jwt from 'jsonwebtoken';

export const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = await req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // console.log(token);

    const decoded = verifyToken(token, JWT_ACCESS_TOKEN_SECRET);
    // const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload;
    // console.log(decoded);

    const { role, _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist');
    }

    if (!roles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};
