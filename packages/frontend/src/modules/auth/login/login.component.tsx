import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { PageWrapper } from '../../common/components/wrapper/wrapper.component';
import { Form } from '../../common/components/form/form.component';
import { APP_KEYS } from '../../common/consts';
import { loginUserSchema } from '../schemas/user.schema';
import { authService } from '../services/auth.service';
import { IUserBody } from '../types/auth.type';
import { ErrorModal } from '../../common/components/error/error.component';

export const Login = () => {
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

  const { mutate: loginUserMutation } = useMutation({
    mutationFn: (data: IUserBody) => authService.loginUser(data),
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
      password: ''
    },
    validationSchema: loginUserSchema,
    onSubmit: (values, actions) => {
      loginUserMutation({ user: values });
      actions.resetForm();
      navigate(APP_KEYS.ROUTER_KEYS.TODOS_LIST);
    }
  });

  return (
    <>
      <PageWrapper>
        <Typography variant="h3">Login Page</Typography>
        <Form onSubmit={formik.handleSubmit}>
          <TextField
            required
            type="email"
            name="email"
            id="email"
            label="Email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <p>{formik.touched.email && formik.errors.email ? formik.errors.email : ''}</p>
          <TextField
            required
            type="password"
            name="password"
            id="password"
            label="Password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <p>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</p>
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
              Login
            </Button>
          </Box>
        </Form>
      </PageWrapper>
      <ErrorModal isOpen={isError} handleClose={handleCloseError} message={errorMessage} />
    </>
  );
};
