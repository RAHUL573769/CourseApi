import { NextFunction, Request, Response } from 'express';
import { AnyObject } from 'mongoose';

// global zod validate middleware
export const validateRequest = (schema: AnyObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);

    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
