import { Router } from 'express';
import { tryCatch } from '../../middlewares/tryCatch.middleware';
import { isExist } from '../../middlewares/isExist.middleware';
import ValidateBody from '../../middlewares/validator.middleware';
import todoController from '../../controllers/todo.controller';
import TodoService from '../../services/todo.service';

const todosRouter: Router = Router();
const todoService: TodoService = new TodoService();

todosRouter.get('/', tryCatch(todoController.getAllTodos.bind(todoController)));

todosRouter.post(
  '/',
  ValidateBody('todo'),
  tryCatch(todoController.createTodo.bind(todoController))
);

todosRouter.put(
  '/:todoId',
  isExist('todoId', todoService.findOneById),
  ValidateBody('todo'),
  tryCatch(todoController.updateTodo.bind(todoController))
);

todosRouter.patch(
  '/:todoId/private',
  isExist('todoId', todoService.findOneById),
  tryCatch(todoController.togglePrivate.bind(todoController))
);

todosRouter.patch(
  '/:todoId/complete',
  isExist('todoId', todoService.findOneById),
  tryCatch(todoController.toggleCompleted.bind(todoController))
);

todosRouter.delete(
  '/:todoId',
  isExist('todoId', todoService.findOneById),
  tryCatch(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
