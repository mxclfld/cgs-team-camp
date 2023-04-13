import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import passport from 'passport';
import { IUser } from '../types/user.type';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
    if (!user || err) {
      return res.status(UNAUTHORIZED).json({
        message: 'Unauthorized'
      });
    }

    req.body.user = user;
    next();
  })(req, res, next);
};
