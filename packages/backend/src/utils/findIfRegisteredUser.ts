import { BAD_REQUEST, CONFLICT } from 'http-status-codes';
import { Request } from 'express';
import { User } from '../entities/user.entity';
import { HttpError } from './createError';

export const findIfRegisteredUser = async (req: Request) => {
  const email = req?.body.user.email;
  if (!email) throw new HttpError({ httpCode: BAD_REQUEST, message: 'Invalid email!' });

  const user = await User.findOneBy({ email });
  if (user) throw new HttpError({ httpCode: CONFLICT, message: 'User already exists!' });

  return true;
};
