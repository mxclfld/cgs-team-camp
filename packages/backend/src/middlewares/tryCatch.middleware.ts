import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export const tryCatch =
  <T>(
    handler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<{ data: T; status?: number }>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data, status = 200 } = await handler(req, res, next);
      res.status(status).json(data);
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
      }
    }
  };
