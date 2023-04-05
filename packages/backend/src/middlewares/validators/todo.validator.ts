import Joi from 'joi';

const todoSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().required(),
  isCompleted: Joi.boolean().required(),
  isPrivate: Joi.boolean().required()
});

export default todoSchema;
