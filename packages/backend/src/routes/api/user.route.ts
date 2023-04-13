import { Router } from 'express';
import { auth } from '../../middlewares/auth.middleware';
import { isExist } from '../../middlewares/isExist.middleware';
import validateBody from '../../middlewares/validator.middleware';
import { tryCatch } from '../../middlewares/tryCatch.middleware';
import userController from '../../controllers/user.controller';
import { findUser } from '../../utils/findUser';
import { findIfRegisteredUser } from '../../utils/findIfRegisteredUser';

const userRouter: Router = Router();

userRouter.post(
  '/register',
  validateBody('user', 'loginRegister'),
  isExist(findIfRegisteredUser),
  tryCatch(userController.register.bind(userController))
);

userRouter.post(
  '/login',
  validateBody('user', 'loginRegister'),
  isExist(findUser('user')),
  tryCatch(userController.login.bind(userController))
);

userRouter.post(
  '/changePassword',
  auth,
  validateBody('newUser', 'changePassword'),
  isExist(findUser('newUser')),
  tryCatch(userController.resetPassword.bind(userController))
);

export default userRouter;
