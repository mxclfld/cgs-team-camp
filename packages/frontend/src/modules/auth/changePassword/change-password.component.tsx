import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { PageWrapper } from '../../common/components/wrapper/wrapper.component';
import { Form } from '../../common/components/form/form.component';
import { APP_KEYS } from '../../common/consts';
import { changePasswordSchema } from '../schemas/user.schema';
import { IChangePasswordBody } from '../types/auth.type';
import { authService } from '../services/auth.service';
import { ErrorModal } from '../../common/components/error/error.component';

export const ChangePassword = () => {
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

  const { mutate: changePasswordMutation } = useMutation({
    mutationFn: (data: IChangePasswordBody) => authService.changePassword(data),
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
      newPassword: ''
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values, actions) => {
      changePasswordMutation({ newUser: { ...values } });
      actions.resetForm();
      navigate(APP_KEYS.ROUTER_KEYS.ROOT);
    }
  });

  return (
    <>
      <PageWrapper>
        <Typography variant="h3">Change Password</Typography>
        <Form onSubmit={formik.handleSubmit}>
          <TextField
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
            type="password"
            name="password"
            id="password"
            label="Old Password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <p>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</p>
          <TextField
            type="password"
            name="newPassword"
            id="newPassword"
            label="New password"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <p>
            {formik.touched.newPassword && formik.errors.newPassword
              ? formik.errors.newPassword
              : ''}
          </p>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="button"
              variant="contained"
              component={Link}
              to={APP_KEYS.ROUTER_KEYS.PROFILE}
            >
              Back
            </Button>
            <Button type="submit" variant="contained" disabled={!(formik.dirty && formik.isValid)}>
              Submit
            </Button>
          </Box>
        </Form>
      </PageWrapper>
      <ErrorModal isOpen={isError} handleClose={handleCloseError} message={errorMessage} />
    </>
  );
};
