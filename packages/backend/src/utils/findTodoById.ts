import { Todo } from '../entities/todo.entity';

const findOneById = async (id: string) => {
  const todo = await Todo.findOneBy({ id });
  return todo;
};

export default findOneById;
