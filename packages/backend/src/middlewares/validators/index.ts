import { ObjectSchema } from 'joi';
import { IValidator } from '../../types/todos.type';
import todo from './todo.validator';
import user from './user.validator';
import loginRegister from './login-register.validator';
import changePassword from './change-password.validator';

const Validators: { [key: string]: ObjectSchema<IValidator> } = {
  todo,
  user,
  loginRegister,
  changePassword
};
export default Validators;
