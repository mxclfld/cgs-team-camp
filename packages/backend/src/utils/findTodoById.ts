import { Request } from 'express';
import { Todo } from '../entities/todo.entity';

const findTodoById = async (req: Request) => {
  const { id } = req.params;
  const todo = await Todo.findOneBy({ id });
  return todo;
};

export default findTodoById;
