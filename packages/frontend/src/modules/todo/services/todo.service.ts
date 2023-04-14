import { AxiosResponse } from 'axios';
import { ITodo } from '../types/todo.type';
import { HttpService } from '../../common/services/http.service';
import { APP_KEYS } from '../../common/consts';
import { ITodoBody } from '../types/todo-body.type';
import { ITodoFilter } from '../types/todo-filter.type';

class TodoService extends HttpService {
  getTodos({ search, status }: ITodoFilter): Promise<AxiosResponse<ITodo[]>> {
    return this.get({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/?search=${search}&status=${status}`
    });
  }

  getTodoById(id: string): Promise<AxiosResponse<ITodo>> {
    return this.get({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`
    });
  }

  addTodo(todo: ITodoBody): Promise<AxiosResponse<ITodo>> {
    return this.post({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}`,
      data: todo
    });
  }

  updateTodo(todo: ITodoBody, id: string): Promise<AxiosResponse<ITodo>> {
    return this.put({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`,
      data: todo
    });
  }

  deleteTodo(id: string): Promise<AxiosResponse<null>> {
    return this.delete({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`
    });
  }

  toggleCompleted(id: string): Promise<AxiosResponse<ITodo>> {
    return this.patch({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}${APP_KEYS.BACKEND_KEYS.COMPLETE}`
    });
  }
}

export const todoService = new TodoService();
