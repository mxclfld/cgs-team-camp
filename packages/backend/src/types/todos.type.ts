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
