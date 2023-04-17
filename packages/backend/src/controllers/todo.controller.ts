import { OK, NO_CONTENT } from 'http-status-codes';
import { IUser } from '../types/user.type';
import { ITodo, ITodoQueryRequest, ITodoRequest } from '../types/todos.type';
import TodoService from '../services/todo.service';

interface IQueryType {
  search: string;
  status: string;
  page: string;
}

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodos(req: ITodoQueryRequest<{ user: IUser }, IQueryType>) {
    const { search = '', status = '', page = '1' } = req.query;
    const { id: userId }: IUser = req.body.user;
    const listPage = parseInt(page, 10);
    const [todos, count] = await this.todoService.findAll({
      page: listPage,
      search,
      status,
      userId
    });

    return { data: { todos, count }, status: OK };
  }

  async getTodoById(req: ITodoRequest<{ user: IUser }>) {
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
    const { id: userId }: IUser = req.body.user;
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
    const { id: userId }: IUser = req.body.user;
    const todo = await this.todoService.togglePrivate(todoId, userId);
    return { data: todo, status: OK };
  }

  async toggleCompleted(req: ITodoRequest<{ user: IUser }>) {
    const { todoId } = req.params;
    const { id: userId }: IUser = req.body.user;
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
