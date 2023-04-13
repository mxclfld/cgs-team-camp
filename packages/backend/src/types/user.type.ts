import { Request } from 'express';

export type Register = { email: string; password: string };
export type Login = { email: string; password: string };

export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface IChangePassword {
  email: string;
  password: string;
  newPassword: string;
}

export interface IUserRequest<T> extends Request {
  body: T;
}
