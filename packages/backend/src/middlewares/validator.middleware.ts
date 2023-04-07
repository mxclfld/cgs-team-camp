import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import validators from './validators';

export default function ValidateBody(validator: string) {
  if (!validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator does not exist`);
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validators[validator].validate(req.body);
      if (error) {
        throw error;
      }
      req.body = value;
      next();
    } catch (err: any) {
      res.status(BAD_REQUEST).json({ error: err.message, body: req.body });
    }
  };
}
