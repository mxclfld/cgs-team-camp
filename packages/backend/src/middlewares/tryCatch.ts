import { NextFunction, Request, RequestHandler, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export const tryCatch =
  (handler: RequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next);
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
      }
    }
  };
