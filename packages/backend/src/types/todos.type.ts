import { Request } from 'express';
import { ParsedQs } from 'qs';
import Joi from 'joi';

export interface IValidator {
  [key: string]: Joi.SchemaLike | Joi.SchemaLike[] | undefined;
}

export interface ITodo {
  name: string;
  description: string;
  isCompleted: boolean;
  isPrivate: boolean;
}

export interface ITodoRequest<T> extends Request {
  body: T;
}

export interface ITodoQueryRequest<T, Y> extends Request {
  body: T;
  query: ParsedQs & Y;
}
