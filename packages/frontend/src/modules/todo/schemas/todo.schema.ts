import * as yup from 'yup';

export const todoSchema = yup.object({
  name: yup.string().min(3).required(),
  description: yup.string().required(),
  isCompleted: yup.boolean().required(),
  isPrivate: yup.boolean().required()
});
