import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PageWrapper } from '../../common/components/wrapper/wrapper.component';
import { Form } from '../../common/components/form/form.component';
import { APP_KEYS } from '../../common/consts';
import { registerUserSchema } from '../schemas/user.schema';

export const Register = () => {
  // TODO: Create new user on click
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerUserSchema,
    onSubmit: () => {
      navigate(APP_KEYS.ROUTER_KEYS.TODOS_LIST);
    }
  });

  return (
    <PageWrapper>
      <Typography variant="h3">Register Page</Typography>
      <Form>
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
          <Button type="button" variant="contained" component={Link} to={APP_KEYS.ROUTER_KEYS.ROOT}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </Form>
    </PageWrapper>
  );
};
