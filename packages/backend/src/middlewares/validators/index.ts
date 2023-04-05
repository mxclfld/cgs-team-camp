import { ObjectSchema } from 'joi';
import todo from './todo.validator';

const Validators: { [key: string]: ObjectSchema<any> } = { todo };
export default Validators;
