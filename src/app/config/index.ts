import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.join(process.cwd(), '.env'),
});
// dotenv.config();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const DB_LOCAL_URL = process.env.DB_LOCAL_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const BCRYPT_SALT_ROUND = process.env.BCRYPT_SALT_ROUND;
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const JWT_ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE;
export const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE;
