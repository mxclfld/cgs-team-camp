import { OK, NO_CONTENT } from 'http-status-codes';
import { Request } from 'express';
import { IUser } from '../types/user.type';
import { ITodo, ITodoRequest } from '../types/todos.type';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodos() {
    const todos = await this.todoService.findAll();
    return { data: todos, status: OK };
  }

  async getTodoById(req: Request) {
    const { todoId } = req.params;
    const todo = await this.todoService.findOneById(todoId);
    return { data: todo, status: OK };
  }

  async createTodo(req: ITodoRequest<{ user: IUser; todo: ITodo }>) {
    const { name, description, isCompleted, isPrivate }: ITodo = req.body.todo;
    const { id: userId }: IUser = req.body.user;
    const todo = await this.todoService.create(
      { name, description, isCompleted, isPrivate },
      userId
    );
    return {
      data: todo,
      status: OK
    };
  }

  async updateTodo(req: ITodoRequest<{ user: IUser; todo: ITodo }>) {
    const { todoId } = req.params;
    const { id: userId } = req.body.user;
    const { name, description, isCompleted, isPrivate }: ITodo = req.body.todo;
    const todo = await this.todoService.update(
      todoId,
      {
        name,
        description,
        isCompleted,
        isPrivate
      },
      userId
    );
    return { data: todo, status: OK };
  }

  async togglePrivate(req: ITodoRequest<{ user: IUser }>) {
    const { todoId } = req.params;
    const { id: userId } = req.body.user;
    const todo = await this.todoService.togglePrivate(todoId, userId);
    return { data: todo, status: OK };
  }

  async toggleCompleted(req: ITodoRequest<{ user: IUser }>) {
    const { todoId } = req.params;
    const { id: userId } = req.body.user;
    const todo = await this.todoService.toggleCompleted(todoId, userId);
    return { data: todo, status: OK };
  }

  async deleteTodo(req: ITodoRequest<{ user: IUser; todo: ITodo }>) {
    const { todoId } = req.params;
    const { id: userId }: IUser = req.body.user;
    await this.todoService.delete(todoId, userId);
    return { data: null, status: NO_CONTENT };
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
