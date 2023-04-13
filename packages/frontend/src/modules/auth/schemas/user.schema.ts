/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export const loginUserSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Password should contain at least 6 chars with 1 digit, lowercase, uppercase and special symbols!'
    )
    .required()
});

export const registerUserSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Password should contain at least 6 chars with 1 digit, lowercase, uppercase and special symbols!'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required()
});

export const changePasswordSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Password should contain at least 6 chars with 1 digit, lowercase, uppercase and special symbols!'
    )
    .required(),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Password should contain at least 6 chars with 1 digit, lowercase, uppercase and special symbols!'
    )
    .required()
});
