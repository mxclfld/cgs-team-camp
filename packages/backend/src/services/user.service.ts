import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcryptjs';
import { IChangePassword, Register, Login } from '../types/user.type';
import { User } from '../entities/user.entity';
import { HttpError } from '../utils/createError';

export default class UserService {
  async findUserByEmail(email: string) {
    const user = await User.findOneBy({ email });
    if (!user) throw new HttpError({ httpCode: NOT_FOUND, message: 'No such user found!' });
    return user;
  }

  async register({ email, password }: Register) {
    const newUser = await User.save({ email, password: hashSync(password, 10) });
    const payload = {
      user: { id: newUser.id, email: newUser.email }
    };
    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });
    return {
      email: newUser.email,
      token
    };
  }

  async login({ email, password }: Login) {
    const user = await User.findOneBy({ email });

    if (!user || !compareSync(password, user.password)) {
      throw new HttpError({
        httpCode: BAD_REQUEST,
        message: 'Incorrect email or password'
      });
    }

    const payload = {
      user: { id: user?.id, email: user?.email }
    };

    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });

    return {
      email: user?.email,
      token
    };
  }

  async changePassword({ email, password, newPassword }: IChangePassword, userId: string) {
    const user = await User.findOneBy({ email });

    if (!user || user.id !== userId || !compareSync(password, user.password)) {
      throw new HttpError({
        httpCode: BAD_REQUEST,
        message: 'Incorrect email or password'
      });
    }

    await User.update(userId, { email, password: hashSync(newPassword, 10) });

    return {
      message: 'Changed password successfully!'
    };
  }
}
