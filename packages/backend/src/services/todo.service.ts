import { FORBIDDEN, BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ILike } from 'typeorm';
import { HttpError } from '../utils/createError';
import { User } from '../entities/user.entity';
import { ITodo } from '../types/todos.type';
import { Todo } from '../entities/todo.entity';
import { FILTER } from '../consts/filter.const';

interface IFindAll {
  page: number;
  search: string;
  status: string;
}

export default class TodoService {
  async findAll({ page, search, status }: IFindAll) {
    const perPage = 5;
    const skip = perPage * page - perPage;
    const filter = FILTER[status];
    const todos = await Todo.findAndCount({
      where: {
        name: ILike(`%${search}%`),
        ...filter
      },
      take: perPage,
      skip
    });
    return todos;
  }

  async findOneById(id: string) {
    const todo = await Todo.findOneBy({ id });
    return todo;
  }

  async create({ name, description, isCompleted, isPrivate }: ITodo, userId: string) {
    const user = await User.findOne({
      where: { id: userId }
    });
    if (!user) {
      throw new HttpError({ httpCode: INTERNAL_SERVER_ERROR, message: 'Something went wrong!' });
    }

    const todo = await Todo.save({
      name,
      description,
      isCompleted,
      isPrivate,
      userId
    });

    await user.save();

    return todo;
  }

  async update(id: string, newTodo: ITodo, userId: string) {
    const todo = await this.findOneById(id);
    if (todo?.userId !== userId) {
      throw new HttpError({
        httpCode: FORBIDDEN,
        message: "This todo doesn't belong to this user!"
      });
    }
    await Todo.update(id, {
      ...todo,
      ...newTodo
    });
    const result = await this.findOneById(id);
    return result;
  }

  async delete(id: string, userId: string) {
    const todoToDelete = await Todo.findOne({
      where: { id }
    });

    if (todoToDelete?.userId !== userId) {
      throw new HttpError({
        httpCode: FORBIDDEN,
        message: "This todo doesn't belong to this user!"
      });
    }

    if (!todoToDelete) {
      throw new HttpError({
        httpCode: BAD_REQUEST,
        message: 'Todo does not exist!'
      });
    }

    await todoToDelete.remove();
    return todoToDelete;
  }

  async togglePrivate(id: string, userId: string) {
    let result = null;
    const todo = await this.findOneById(id);
    if (!todo) {
      throw new HttpError({ httpCode: BAD_REQUEST, message: 'Todo does not exist!' });
    }

    if (todo.userId !== userId) {
      throw new HttpError({
        httpCode: FORBIDDEN,
        message: "This todo doesn't belong to this user!"
      });
    }

    todo.isPrivate = !todo.isPrivate;
    result = await todo.save();
    return result;
  }

  async toggleCompleted(id: string, userId: string) {
    let result = null;
    const todo = await this.findOneById(id);

    if (!todo) {
      throw new HttpError({ httpCode: BAD_REQUEST, message: 'Todo does not exist!' });
    }

    if (todo.userId !== userId) {
      throw new HttpError({
        httpCode: FORBIDDEN,
        message: "This todo doesn't belong to this user!"
      });
    }

    todo.isCompleted = !todo.isCompleted;
    result = await todo.save();

    return result;
  }
}
