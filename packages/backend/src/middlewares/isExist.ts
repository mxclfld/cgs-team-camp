import { Request, Response, NextFunction } from 'express';
import { NOT_FOUND } from 'http-status-codes';
import { Todo } from '../entities/todo.entity';

export const isExist = async (req: Request, res: Response, next: NextFunction) => {
  const { todoId } = req.params;
  const result = await Todo.findOneBy({ id: todoId });
  if (!result) {
    res.status(NOT_FOUND).json({ error: `Item with id ${todoId} does not exist!` });
  } else {
    next();
  }
};
