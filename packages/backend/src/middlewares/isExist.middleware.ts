import { Request, Response, NextFunction } from 'express';

export const isExist =
  <T>(callback: (req: Request) => T | null) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req);
      next();
    } catch (err: any) {
      res.status(err.httpCode).json({ message: err.message });
    }
  };
