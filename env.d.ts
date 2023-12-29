declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number;
    DB_URL: string;
    DB_LOCAL_URL: string;
    NODE_ENV: string;
    BCRYPT_SALT_ROUND: number;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_ACCESS_EXPIRE: string;
    JWT_REFRESH_EXPIRE: string;
  };
}
