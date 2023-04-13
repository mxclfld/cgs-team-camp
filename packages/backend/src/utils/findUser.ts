import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { Request } from 'express';
import { compareSync } from 'bcryptjs';
import { User } from '../entities/user.entity';
import { HttpError } from './createError';

export const findUser = (userType: string) => async (req: Request) => {
  const email = req?.body[userType].email;
  const password = req?.body[userType].password;

  if (!email || !password) {
    throw new HttpError({ httpCode: BAD_REQUEST, message: 'Provide valid email and password!' });
  }

  const user = await User.findOneBy({ email });

  if (!user) {
    throw new HttpError({ httpCode: NOT_FOUND, message: 'User not found!' });
  }

  if (!compareSync(password, user.password)) {
    console.log({ body: req.body.user });
    console.log({ [userType]: req.body[userType] });
    throw new HttpError({ httpCode: BAD_REQUEST, message: "Old passwords don't match!" });
  }

  return true;
};
