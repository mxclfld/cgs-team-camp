import Joi from 'joi';

const todoSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().required(),
  isCompleted: Joi.boolean().required(),
  isPrivate: Joi.boolean().required(),
  user: {
    id: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  }
});

export default todoSchema;
