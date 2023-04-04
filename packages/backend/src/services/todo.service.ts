import { ITodo } from '../types/todos.type';
import { Todo } from '../entities/todo.entity';

export default class TodoService {
  async findAll() {
    const todos = await Todo.find();
    return todos;
  }

  async findOneById(id: string) {
    const todo = await Todo.findOneBy({ id });
    return todo;
  }

  async create({ name, description, isCompleted, isPrivate }: ITodo) {
    const todo = await Todo.save({
      name,
      description,
      isCompleted,
      isPrivate
    });
    return todo;
  }

  async update(id: string, newTodo: ITodo) {
    const todo = await this.findOneById(id);
    await Todo.update(id, {
      ...todo,
      ...newTodo
    });
    const result = await this.findOneById(id);
    return result;
  }

  async delete(id: string) {
    const todo = await this.findOneById(id);
    const result = todo?.remove();
    return result;
  }

  async togglePrivate(id: string) {
    let result = null;
    const todo = await this.findOneById(id);
    if (todo) {
      todo.isPrivate = !todo.isPrivate;
      result = await todo.save();
    }
    return result;
  }

  async toggleCompleted(id: string) {
    let result = null;
    const todo = await this.findOneById(id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      result = await todo.save();
    }
    return result;
  }
}
