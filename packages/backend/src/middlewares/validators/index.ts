import { ObjectSchema } from 'joi';
import { IValidator } from '../../types/todos.type';
import todo from './todo.validator';

const Validators: { [key: string]: ObjectSchema<IValidator> } = { todo };
export default Validators;
