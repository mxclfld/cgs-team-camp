import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import passport from 'passport';
import { IUser } from '../types/user.type';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
    if (!user) {
      return res.status(UNAUTHORIZED).json({
        message: 'Unauthorized!'
      });
    }

    if (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error'
      });
    }

    req.body.user = user;
    next();
  })(req, res, next);
};
