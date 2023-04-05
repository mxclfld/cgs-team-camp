import { Response, Request } from 'express';
import { ITodo } from '../types/todos.type';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodos(_: Request, res: Response) {
    const todos = await this.todoService.findAll();
    res.send(todos);
  }

  async createTodo(req: Request, res: Response) {
    const { name, description, isCompleted, isPrivate }: ITodo = req.body;
    const todo = await this.todoService.create({ name, description, isCompleted, isPrivate });
    res.send(todo);
  }

  async updateTodo(req: Request, res: Response) {
    const { todoId } = req.params;
    const { name, description, isCompleted, isPrivate }: ITodo = req.body;
    const todo = await this.todoService.update(todoId, {
      name,
      description,
      isCompleted,
      isPrivate
    });
    res.send(todo);
  }

  async togglePrivate(req: Request, res: Response) {
    const { todoId } = req.params;
    const todo = await this.todoService.togglePrivate(todoId);
    res.send(todo);
  }

  async toggleCompleted(req: Request, res: Response) {
    const { todoId } = req.params;
    const todo = await this.todoService.toggleCompleted(todoId);
    res.send(todo);
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.body;
    const todo = await this.todoService.delete(id);
    res.send(todo);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
