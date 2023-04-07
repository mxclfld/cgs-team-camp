import Joi from 'joi';
import { Request } from 'express';

export interface IValidator {
  [key: string]: Joi.SchemaLike | Joi.SchemaLike[] | undefined;
}

export interface ITodo {
  name: string;
  description: string;
  isCompleted: boolean;
  isPrivate: boolean;
}

export interface ITodoRequest extends Request {
  body: ITodo;
}
