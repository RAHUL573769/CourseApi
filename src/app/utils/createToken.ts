import { TJwtPayload } from '../modules/auth/auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (jwtPayload: TJwtPayload, secret: string, expiresIn: string) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
