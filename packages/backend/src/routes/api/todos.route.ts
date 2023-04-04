import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('/', todoController.getAllTodos.bind(todoController));

todosRouter.post('/', todoController.createTodo.bind(todoController));

todosRouter.put('/:todoId', todoController.updateTodo.bind(todoController));

todosRouter.patch('/:todoId/private', todoController.toggleCompleted.bind(todoController));

todosRouter.patch('/:todoId/complete', todoController.toggleCompleted.bind(todoController));

todosRouter.delete(':todoId', todoController.deleteTodo.bind(todoController));

export default todosRouter;
