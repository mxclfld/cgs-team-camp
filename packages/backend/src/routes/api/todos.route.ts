import { Router } from 'express';
import { tryCatch } from '../../middlewares/tryCatch.middleware';
import { auth } from '../../middlewares/auth.middleware';
import findTodoById from '../../utils/findTodoById';
import { isExist } from '../../middlewares/isExist.middleware';
import validateBody from '../../middlewares/validator.middleware';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('/', auth, tryCatch(todoController.getAllTodos.bind(todoController)));

todosRouter.get(
  '/:todoId',
  auth,
  isExist(findTodoById),
  tryCatch(todoController.getTodoById.bind(todoController))
);

todosRouter.post(
  '/',
  auth,
  validateBody('todo', 'todo'),
  tryCatch(todoController.createTodo.bind(todoController))
);

todosRouter.put(
  '/:todoId',
  auth,
  isExist(findTodoById),
  validateBody('todo', 'todo'),
  tryCatch(todoController.updateTodo.bind(todoController))
);

todosRouter.patch(
  '/:todoId/private',
  auth,
  isExist(findTodoById),
  tryCatch(todoController.togglePrivate.bind(todoController))
);

todosRouter.patch(
  '/:todoId/complete',
  auth,
  isExist(findTodoById),
  tryCatch(todoController.toggleCompleted.bind(todoController))
);

todosRouter.delete(
  '/:todoId',
  auth,
  isExist(findTodoById),
  tryCatch(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
