import { Request, Response, NextFunction } from 'express';
import { NOT_FOUND } from 'http-status-codes';

export const isExist =
  <T>(paramName: string, callback: (param: string) => T | null) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { [paramName]: param } = req.params;
    const result = await callback(param);
    if (!result) {
      res.status(NOT_FOUND).json({ error: `Item with parameter ${param} does not exist!` });
    } else {
      next();
    }
  };
