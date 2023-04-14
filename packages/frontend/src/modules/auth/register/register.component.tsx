import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { PageWrapper } from '../../common/components/wrapper/wrapper.component';
import { Form } from '../../common/components/form/form.component';
import { APP_KEYS } from '../../common/consts';
import { registerUserSchema } from '../schemas/user.schema';
import { authService } from '../services/auth.service';
import { IUserBody } from '../types/auth.type';
import { ErrorModal } from '../../common/components/error/error.component';

export const Register = () => {
  const navigate = useNavigate();

  const [isError, setisError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleOpenError = (msg: string) => {
    setErrorMessage(msg);
    setisError(true);
  };

  const handleCloseError = () => {
    setErrorMessage('');
    setisError(false);
  };

  const { mutate: registerUserMutation } = useMutation({
    mutationFn: (data: IUserBody) => authService.registerUser(data),
    onSuccess: (data) => {
      localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, data.data.token);
    },
    onError: (err: AxiosError) => {
      handleOpenError(err.message);
    }
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerUserSchema,
    onSubmit: (values, actions) => {
      registerUserMutation({ user: { email: values.email, password: values.password } });
      actions.resetForm();
      navigate(APP_KEYS.ROUTER_KEYS.TODOS_LIST);
    }
  });

  return (
    <>
      <PageWrapper>
        <Typography variant="h3">Register Page</Typography>
        <Form onSubmit={formik.handleSubmit}>
          <TextField
            type="email"
            name="email"
            id="email"
            label="Email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <p>{formik.touched.email && formik.errors.email ? formik.errors.email : ''}</p>
          <TextField
            type="password"
            name="password"
            id="password"
            label="Password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <p>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</p>
          <TextField
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm password"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <p>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ''}
          </p>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="button"
              variant="contained"
              component={Link}
              to={APP_KEYS.ROUTER_KEYS.ROOT}
            >
              Back
            </Button>
            <Button type="submit" variant="contained" disabled={!(formik.dirty && formik.isValid)}>
              Register
            </Button>
          </Box>
        </Form>
      </PageWrapper>
      <ErrorModal isOpen={isError} handleClose={handleCloseError} message={errorMessage} />
    </>
  );
};
