import { Router } from 'express';
import { tryCatch } from '../../middlewares/tryCatch';
import { isExist } from '../../middlewares/isExist';
import ValidateBody from '../../middlewares/validator';
import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('/', tryCatch(todoController.getAllTodos.bind(todoController)));

todosRouter.post(
  '/',
  ValidateBody('todo'),
  tryCatch(todoController.createTodo.bind(todoController))
);

todosRouter.put(
  '/:todoId',
  isExist,
  ValidateBody('todo'),
  tryCatch(todoController.updateTodo.bind(todoController))
);

todosRouter.patch(
  '/:todoId/private',
  isExist,
  tryCatch(todoController.togglePrivate.bind(todoController))
);

todosRouter.patch(
  '/:todoId/complete',
  isExist,
  tryCatch(todoController.toggleCompleted.bind(todoController))
);

todosRouter.delete('/:todoId', isExist, tryCatch(todoController.deleteTodo.bind(todoController)));

export default todosRouter;
