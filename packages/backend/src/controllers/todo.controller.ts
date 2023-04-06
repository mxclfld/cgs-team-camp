import { Request } from 'express';
import { ITodo, ITodoRequest } from '../types/todos.type';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodos() {
    const todos = await this.todoService.findAll();
    return { data: todos };
  }

  async getTodoById(req: Request) {
    const { todoId } = req.params;
    const todo = await this.todoService.findOneById(todoId);
    return { data: todo };
  }

  async createTodo(req: ITodoRequest) {
    const { name, description, isCompleted, isPrivate }: ITodo = req.body;
    const todo = await this.todoService.create({ name, description, isCompleted, isPrivate });
    return { data: todo };
  }

  async updateTodo(req: ITodoRequest) {
    const { todoId } = req.params;
    const { name, description, isCompleted, isPrivate }: ITodo = req.body;
    const todo = await this.todoService.update(todoId, {
      name,
      description,
      isCompleted,
      isPrivate
    });
    return { data: todo };
  }

  async togglePrivate(req: Request) {
    const { todoId } = req.params;
    const todo = await this.todoService.togglePrivate(todoId);
    return { data: todo };
  }

  async toggleCompleted(req: Request) {
    const { todoId } = req.params;
    const todo = await this.todoService.toggleCompleted(todoId);
    return { data: todo };
  }

  async deleteTodo(req: Request) {
    const { todoId } = req.params;
    const todo = await this.todoService.delete(todoId);
    return { data: todo };
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
