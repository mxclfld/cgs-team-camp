import Joi from 'joi';

const loginRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'required 6 characters where 1 uppercase, 1 lowercase and 1 digit at least'
    )
    .required()
});

export default loginRegisterSchema;
