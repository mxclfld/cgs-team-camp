import * as yup from 'yup';

export const loginUserSchema = yup.object({
  name: yup.string().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      'Password should contain at least 6 chars with 1 digit, lowercase and uppercase symbols!'
    )
    .required()
});

export const registerUserSchema = yup.object({
  name: yup.string().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      'Password should contain at least 6 chars with 1 digit, lowercase and uppercase symbols!'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required()
});

export const profileUserSchema = yup.object({
  name: yup.string().required(),
  oldPassword: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      'Password should contain at least 6 chars with 1 digit, lowercase and uppercase symbols!'
    )
    .required(),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      'Password should contain at least 6 chars with 1 digit, lowercase and uppercase symbols!'
    )
    .required()
});
